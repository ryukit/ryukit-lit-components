import { LitElement, html, css } from "lit";

class ProductCard extends LitElement {
  static styles = css`
    :host {
      width: var(--card-width-equal);
    }
    .card {
      padding: var(--block-indent);
      border: 1px solid transparent;
      transition: border .3s;
    }
    .image {
      position: relative;
      width: 100%;
      aspect-ratio: 1 / 1;
      overflow: hidden;
      margin-bottom: var(--block-indent);
    }
    .image img {
      max-width: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: all .3s;
    }
    .card:hover {
      border-color: var(--suggested-products-main-color);
    }
    .card:hover .image img {
      transform: translate(-50%, -50%) rotate(-15deg);
      width: 150%;
      max-width: 150%;
    }
    .title {
      display: block;
      text-decoration: none;
      white-space: normal;
      overflow-wrap: break-word;
      word-wrap: break-word;
      word-break: normal;
      color: var(--subscribe-component-main-color);
      font-size: var(--suggested-products-subtitle-size);
      line-height: 22px;
      min-height: 44px;
      overflow: hidden;
      margin-top: 0;
      margin-bottom: 8px;
      transition: color .3s;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .description {
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      font-size: var(--suggested-products-text-size);
    }
    .title:hover {
      color: var(--subscribe-component-text-color-hover);
    }
  `;
  static properties = {
    product: { type: Object },
  };
  render() {
    return html`
    <div class="card">
      <div class="image">
        <img src="${this.product.image}" alt="${this.product.title}" />
      </div>
      <a href="#" class="title">${this.product.title}</a>
      <p class="description">${this.product.description}</p>
      <p>Price: $${this.product.price}</p>
    </div>
    `;
  };
}

customElements.define('product-card', ProductCard);
