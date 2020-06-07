/*
 * © 2020 Stratio Big Data Inc., Sucursal en España.
 *
 * This software is licensed under the Apache License, Version 2.0.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the terms of the License for more details.
 *
 * SPDX-License-Identifier: Apache-2.0.
 */

import {css, customElement, html, internalProperty, LitElement, property, TemplateResult, unsafeCSS} from 'lit-element';
import '@vanillawc/wc-markdown/index'
import '../../src/components/st-horizontal-tabs';
import styles from './demo-template.css';

enum TemplateSections {
  demo = 'Demo',
  demoSourceCode = 'Demo Code',
  api = 'Component Api',
  sourceCode = 'Component Code',
  changelog = 'Changelog',
}

@customElement('demo-template')
export class DemoTemplate extends LitElement {

  @property() componentName: string;
  @property() componentDescription: string;
  @property() designBehavior: string;
  @property() demoSourceCode: string;
  @property() sourceCode: string;
  @property() changelog: string;

  static styles = css`${unsafeCSS(styles)}`;

  @internalProperty()
  public currentSection: TemplateSections = TemplateSections.demo;

  render(): TemplateResult {
    return html`
    <div class="demo-template">
        <h1 class="demo-template__title">${this.componentName}</h1>
        <hr class="demo-template__hr">
        <div class="demo-template__description">${this.componentDescription}</div>
        <div class="demo-template__separator"></div>

        ${this.getTabs()}

        <div class="demo-template__content">
            ${this.currentSection === TemplateSections.demoSourceCode ?
      html`<textarea>${this.demoSourceCode}</textarea>
          ` : ''}
            ${this.currentSection === TemplateSections.changelog ?
      html`<wc-markdown>${this.changelog}</wc-markdown>
          ` : ''}
            ${this.currentSection === TemplateSections.sourceCode ?
      html`<textarea>${this.sourceCode}</textarea>` : ''}
            <!--<wc-monaco-editor language="markdown"></wc-monaco-editor>-->
            ${this.currentSection === TemplateSections.demo ? html`
                <div class="content">
                    <slot name="content"></slot>
                </div>
                <div class="demo-template__separator"></div>
                <section><h2>Design & Behavior</h2><p>${this.designBehavior}</p></section>
                <section><h2>Usage and Best Practices</h2><slot name="usage"></slot></section>
            ` : ''}
        </div>

    </div>
    `;
  }

  public getTabs() {
    return html`
      <div class="tabs">
        ${Object.keys(TemplateSections).map((key: string) =>
      html`
            <div @click="${() => this.setTab(TemplateSections[key])}"
                class="tab ${this.currentSection === TemplateSections[key] ? 'tab--active' : ''}">
                ${TemplateSections[key]}
            </div>
        `)}
      </div>
    `;
  }

  public setTab(tab: TemplateSections) {
    this.currentSection = tab;
  }
}
