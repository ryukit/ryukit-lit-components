import { LitElement, html, css } from "lit";
import "./ProductCard.js";
import { sharedStyles } from "./sharedStyles.js";

export class ProductSuggestion extends LitElement {
  static styles = [
    sharedStyles,
    css`
      :host {
        --suggested-products-main-color: #000;
        --suggested-products-alt-color: #fff;
        --suggested-products-background-color: #f19c9c;
        --suggested-products-text-color-hover: #8a00ff;
        --suggested-products-title-size: 24px;
        --suggested-products-subtitle-size: 20px;
        --suggested-products-text-size: 16px;
      }
      .suggested-products {
        position: relative;
        padding: var(--block-indent-x3) var(--block-indent-x2);
        background: var(--suggested-products-background-color);
        border-top: 1px solid var(--suggested-products-main-color);
        border-bottom: 1px solid var(--suggested-products-main-color);
      }
      .controls {
        position: absolute;
        top: 34px;
        right: 16px;
      }
      .button {
        padding: 5px 10px;
        border-radius: 20px;
        color: var(--suggested-products-alt-color);
        background: var(--suggested-products-main-color);
        border: 1px solid var(--suggested-products-main-color);
        transition: all .3s;
        cursor: pointer;
      }
      .button[disabled] {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .button:not([disabled]):hover {
        background: var(--suggested-products-alt-color);
        color: var(--suggested-products-main-color);
      }
      .title {
        white-space: normal;
        overflow-wrap: break-word;
        word-wrap: break-word;
        word-break: normal;
        color: var(--suggested-products-main-color);
        cursor: inherit;
        font-weight: normal;
        font-size: var(--suggested-products-title-size);
        margin-bottom: 24px;
      }
      .product-list {
        display: flex;
        margin: 0 var(--block-indent-negative);
      }
    `
  ];

  static properties = {
    title: { type: String },
    products: { type: Array },
    productsPerPage: { type: Number },
    pageNumber: { type: Number },
    visibleProducts: { type: Array },
  };

  constructor() {
    super();
    this.products = [];
    this._productsPerPage = 4;
    this.pageNumber = 0;
    this.visibleProducts = [];
  };

  get productsPerPage() {
    return this._productsPerPage;
  };

  set productsPerPage(value) {
    if (typeof value !== 'number' || isNaN(value)) {
      console.warn('Invalid property type. "productsPerPage" must be a number, using default value 4');
      this._productsPerPage = 4;
    } else {
      this._productsPerPage = value;
    }
    this.requestUpdate('productsPerPage', value);
  };

  connectedCallback() {
    super.connectedCallback();
    this.getProduct();
  };

  async getProduct() {
    const res = await fetch('https://fakestoreapi.com/products/');
    this.products = await res.json();
    this.productsToShow();
  };

  productsToShow() {
    const start = this.pageNumber*this.productsPerPage
    this.visibleProducts = this.products.slice(start, start + this.productsPerPage)
  };

  nextPage() {
    this.pageNumber++;
    this.productsToShow();
  };

  prevPage() {
    this.pageNumber--;
    this.productsToShow();
  };

  render() {
    return html `
      <div class="suggested-products" style="--card-width-equal: ${100 / this.productsPerPage + '%'}">
        <h2 class="title mt0">${this.title}</h2>
        <div class="controls">
          <button
            class="button"
            .disabled=${this.pageNumber === 0}
            @click=${() => this.prevPage()}
          >
            Prev
          </button>
          <button
            class="button"
            .disabled=${this.pageNumber+1 >= Math.ceil(this.products.length/this.productsPerPage)}
            @click=${() => this.nextPage()}
          >
            Next
          </button>
        </div>
        <div class="product-list">
          ${this.visibleProducts.length
            ? this.visibleProducts.map((product) => html`
              <product-card .product="${product}"></product-card>
            `)
            : html`<p>Loading ...</p>`
          }
        </div>
      </div>
    `
  };
}
