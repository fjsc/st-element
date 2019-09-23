/*
 * © 2017 Stratio Big Data Inc., Sucursal en España.
 *
 * This software is licensed under the Apache License, Version 2.0.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the terms of the License for more details.
 *
 * SPDX-License-Identifier: Apache-2.0.
 */

import {
  LitElement,
  html,
  customElement,
  property
} from 'lit-element';
import { TemplateResult } from 'lit-html';

/**
 * Use the customElement decorator to define your class as
 * a custom element. Registers <my-element> as an HTML tag.
 */
@customElement('st-element')
export class StElement extends LitElement {
  /**
   * Create an observed property. Triggers update on change.
   */
  @property()
  name = '';

  /**
   * Implement `render` to define a template for your element.
   */
  render(): TemplateResult {
    /**
     * Use JavaScript expressions to include property values in
     * the element template.
     */
    return html`
      <style>
        :host {
          display: block;
          --main-bg-color: coral;
        }
        :host([hidden]) {
          display: none;
        }

        .st-container {
          background-color: var(--main-bg-color);
        }
      </style>
      <div class='st-container'>Hi ${this.name} Elements</div>
    `;
  }
}
