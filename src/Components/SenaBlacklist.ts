import { html, LitElement } from 'lit'
import { state } from 'lit/decorators.js'
import './SenaBackground.ts'

type BlacklistRecord = {
  platform: string
  id: string
  name: string
  summary: string
}

export class SenaBlacklist extends LitElement {
  private static readonly DATA_URL = './data/blacklist.json'

  private static readonly PLATFORM_META = {
    bilibili: '哔哩哔哩',
    tieba: '百度贴吧',
    netease: '网易云音乐',
    github: 'GitHub',
    twitter: 'Twitter / X',
    discord: 'Discord'
  } as const

  private static normalizeRecord(record: Partial<BlacklistRecord> | null | undefined): BlacklistRecord {
    return {
      platform: String(record?.platform ?? '').trim(),
      id: String(record?.id ?? '').trim(),
      name: String(record?.name ?? '').trim(),
      summary: String(record?.summary ?? '').trim()
    }
  }

  private static getPlatformLabel(platform: string) {
    return SenaBlacklist.PLATFORM_META[platform.trim() as keyof typeof SenaBlacklist.PLATFORM_META]
  }

  @state()
  private accessor records: BlacklistRecord[] = []

  @state()
  private accessor keyword = ''

  @state()
  private accessor loading = true

  @state()
  private accessor errorMessage = ''

  private get filteredRecords() {
    const keyword = this.keyword.trim().toLowerCase()
    if (!keyword) return this.records

    return this.records.filter((record) =>
      `${record.platform} ${SenaBlacklist.getPlatformLabel(record.platform)} ${record.id} ${record.name} ${
        record.summary
      }`
        .toLowerCase()
        .includes(keyword)
    )
  }

  private handleSearch(event: Event) {
    this.keyword = (event.target as HTMLInputElement).value
  }

  private renderContent() {
    if (this.loading) {
      return html`
        <div class="blacklist-message">正在读取黑名单...</div>
      `
    }

    if (this.errorMessage) {
      return html`
        <div class="blacklist-message">无法读取 ${SenaBlacklist.DATA_URL}：${this.errorMessage}</div>
      `
    }

    if (!this.filteredRecords.length) {
      return html`
        <div class="blacklist-message">没有匹配的记录。</div>
      `
    }

    return this.filteredRecords.map(
      (record) =>
        html`
          <article class="blacklist-item">
            <div class="blacklist-item-header">
              <h2 class="blacklist-name">${record.name || '未命名'}</h2>
              <div class="blacklist-meta">
                <span
                  class="blacklist-platform blacklist-platform-${record.platform}"
                >
                  ${SenaBlacklist.getPlatformLabel(record.platform)}
                </span>
                <span>${record.id || '无 ID'}</span>
              </div>
            </div>
            ${record.summary ? html`<div class="blacklist-summary">${record.summary}</div>` : ''}
          </article>
        `
    )
  }

  public override render() {
    return html`
      <link rel="stylesheet" href="./styles.css">
      <sena-background></sena-background>
      <main class="blacklist-page">
        <header class="blacklist-title">
          <h1>Blacklist</h1>
          <p>黑名单记录</p>
        </header>

        <section class="blacklist-toolbar" aria-label="黑名单筛选">
          <input
            type="search"
            placeholder="搜索平台、ID、名称或摘要"
            autocomplete="off"
            .value="${this.keyword}"
            @input="${this.handleSearch}"
          >
          <div class="blacklist-count">${
            this.loading ? '读取中...' : `${this.filteredRecords.length} / ${this.records.length}`
          }</div>
        </section>

        <section class="blacklist-toolbar blacklist-info">
          <div>欢迎帮助项目收录诋毁、辱骂、攻击、讽刺、抹黑<strong>姬野星奏</strong>及其相关内容的 spammer。具体细节请参考 <a href="https://biyuehu.github.io/HimenoSena/docs/blacklist" target="_blank">添加黑名单</a></div>
        </section>

        <section class="blacklist-list" aria-live="polite">
          ${this.renderContent()}
        </section>
      </main>
    `
  }

  public override async connectedCallback() {
    super.connectedCallback()

    try {
      const response = await fetch(SenaBlacklist.DATA_URL, { cache: 'no-store' })
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const data = await response.json()
      if (!Array.isArray(data)) {
        throw new Error('黑名单 JSON 顶层必须是数组')
      }

      this.records = data.map(SenaBlacklist.normalizeRecord)
    } catch (error) {
      this.errorMessage = error instanceof Error ? error.message : String(error)
    } finally {
      this.loading = false
    }
  }
}
