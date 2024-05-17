import { LitElement, html, css } from 'lit';
import { db } from "../firebase.js";
import { doc, setDoc } from "firebase/firestore";
import { sharedStyles } from "./sharedStyles.js";

const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

export class SubscriptionComponent extends LitElement {
  static styles = [
    sharedStyles,
    css`
      :host {
        --subscribe-component-main-color: #000;
        --subscribe-component-alt-color: #fff;
        --subscribe-component-error-color: #cd0606;
        --subscribe-component-error-background: #ff6868;
        --subscribe-component-padding: 40px;
        --subscribe-component-title-size: 24px;
        --subscribe-component-text-size: 16px;
        display: block;
        box-shadow: 0 10px 24px 0 rgba(54, 61, 77, 0.15);
        border-radius: 8px;
        overflow: hidden;
      }
      .subscribe-component {
        color: var(--subscribe-component-main-color);
        background: var(--subscribe-component-alt-color);
      }
      .body {
        padding: var(--subscribe-component-padding);
        text-align: center;
      }
      .title {
        white-space: normal;
        overflow-wrap: break-word;
        word-wrap: break-word;
        word-break: normal;
        color: var(--subscribe-component-main-color);
        cursor: inherit;
        font-weight: normal;
        font-size: var(--subscribe-component-title-size);
        margin-bottom: var(--block-indent-x2);
      }
      .description {
        font-size: var(--subscribe-component-text-size);
        opacity: 0.5;
        margin-bottom: var(--block-indent-x3);
      }
      .form {
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
      }
      .fields {
        margin-bottom: var(--block-indent-x3);
        position: relative;
      }
      .fields:last-child {
        margin-bottom: 0;
      }
      .fields input {
        width: 100%;
        max-width: 100%;
        line-height: 1.5;
        color: var(--subscribe-component-main-color);
        background: transparent;
        padding: 23px 40% 23px 24px;
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 6px;
      }
      .fields input.is-error {
        border-color: var(--subscribe-component-error-color);
      }
      .button {
        text-decoration: none;
        display: block;
        border: solid 1px var(--subscribe-component-main-color);
        white-space: nowrap;
        outline: 0;
        font-family: inherit;
        font-weight: bold;
        line-height: 1.5;
        padding: 11px 23px;
        position: relative;
        color: var(--subscribe-component-alt-color);
        background: var(--subscribe-component-main-color);
        border-radius: 6px;
        cursor: pointer;
        transition: all .3s ease-out;
      }
      .button[disabled] {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .button:not([disabled]):hover {
        background: var(--subscribe-component-alt-color);
        color: var(--subscribe-component-main-color);
      }
      .fields .button {
        position: absolute;
        top: 0;
        right: 0;
        margin: var(--block-indent);
        padding: var(--block-indent-x2);
        min-width: 143px;
      }
      .image {
        line-height: 0;
      }
      .error-msg {
        padding: var(--block-indent) 0;
        margin-bottom: var(--block-indent);
        background: var(--subscribe-component-error-background);
        color: var(--subscribe-component-alt-color);
      }
    `
  ];

  static properties = {
    title: { type: String },
    emailValue: { type: String },
    confirmState: { state: false },
    errorState: { state: false },
    errorMessage: { type: String },
  };

  constructor() {
    super();
    this.title = "Please fill your email to subscribe";
    this.emailValue = !!localStorage.getItem('CC_Subscribed')
      ? localStorage.getItem('CC_Subscribed')
      : '';
    this.confirmState = !!localStorage.getItem('CC_Subscribed');
    this.errorState = false;
    this.errorMessage = '';
  };

  async handleSubmit(e) {
    e.preventDefault();
    if(!this.emailValidation()) {
      this.errorState = true;
      this.errorMessage = 'Invalid email';
      return false;
    }
    const pushEmail = await setDoc(doc(db, "subscriptions", this.emailValue), {
      email: this.emailValue,
    }).then((res) => {
      this.confirmState = true;
      this.errorState = false;
      localStorage.setItem('CC_Subscribed', this.emailValue)
    }).catch((error) => {
      this.errorState = true;
      this.confirmState = false;
      this.errorMessage = 'Sorry something went wrong, please try again';
    });
  };

  emailValidation() {
    return emailRegExp.test(this.emailValue)
  };

  render() {
    return this.confirmState
    ? html `
        <div class="subscribe-component">
          <div class="body">
            <h2 class="title mb0 mt0">Thank you for subscription, please check "${this.emailValue}" for confirmation</h2>
          </div>
        </div>
      `
    : html `
      <div class="subscribe-component">
        <div class="image">
          <img src="./images/banner-7a8867d16861478c17762700d8a71d8c167866e6776b86eac27724abca5f9eb6.jpeg"
               alt="banner image">
        </div>
        <div class="body">
          <h2 class="title mt0">${this.title}</h2>
          <p class="description mt0">
            <slot name="description"></slot>
          </p>
          <form class="form" novalidate @submit=${this.handleSubmit}>
            <div .hidden=${!this.errorState} class="error-msg">${this.errorMessage}</div>
            <div class="fields">
              <input
                class=${this.errorState && 'is-error'}
                placeholder="Your email"
                @input=${(e) => this.emailValue = e.target.value}
                .value=${this.emailValue}
              />
              <button class="button" type="submit" .disabled=${this.emailValue.length < 5}>Submit</button>
            </div>
          </form>
        </div>
      </div>
    `;
  };
}

