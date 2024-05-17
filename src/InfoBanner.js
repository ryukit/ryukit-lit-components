import { LitElement, html, css } from "lit";
import { sharedStyles } from "./sharedStyles.js";

export class InfoBanner extends LitElement {
  static styles = [
    sharedStyles,
    css`
      :host {
        --info-banner-main-color: #000;
      }
      .info-banner {
        position: relative;
        padding: var(--block-indent-x2);
        margin-bottom: var(--block-indent);
        background: var(--banner-background);
        color: var(--banner-text-color);
      }
      .title {
        margin: 0 0 var(--block-indent-x2) 0;
        color: var(--banner-text-color);
      }
      .content {
        opacity: 0.9;
      }
      .close-button {
        position: absolute;
        top: 16px;
        right: 16px;
        font-size: 0;
        line-height: 0;
        cursor: pointer;
        padding: 0;
        margin: 0;
        border: 1px solid transparent;
        outline: none;
        width: 20px;
        text-align: center;
        aspect-ratio: 1 / 1;
        background: transparent;
        transition: border-color .3s;
      }
      .close-button:hover {
        border-color: var(--info-banner-main-color);
      }
      .close-button::before {
        font-size: 16px;
        line-height: 18px;
        content: '✕';
        display: block;
      }
    `
  ];

  static properties = {
    backgroundColor: { type: String },
    textColor: { type: String },
    isVisible: { state: true }
  };
  constructor() {
    super();
    this.backgroundColor = '#e9f2ff';
    this.textColor = '#172b4d';
    this.isVisible = true;
  };
  render() {
    return html`
      <div
        .hidden=${!this.isVisible}
        part="banner-wrapper"
        class="info-banner"
        style="--banner-background: ${this.backgroundColor}; --banner-text-color: ${this.textColor}"
      >
        <button class="close-button" @click=${() => this.isVisible = false}>
          close
        </button>
        <h3 part="banner-title" class="title">
          <slot name="title"></slot>
        </h3>
        <p part="banner-content" class="content mb0">
          <slot name="content"></slot>
        </p>
      </div>
    `
  };
}
