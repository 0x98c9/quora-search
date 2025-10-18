import { useEffect, useMemo, useRef, useState } from 'react'

type PatternGroup = {
  id: string
  label: string
  options: string[]
}

const PATTERN_GROUPS: PatternGroup[] = [
  { id: 'how', label: 'How', options: ['how do', 'how does', 'how to', 'how can'] },
  { id: 'can', label: 'Can', options: ['can I', 'can you', 'can we'] },
  { id: 'what', label: 'What', options: ['what is', 'what are', 'what does', 'what can'] },
  { id: 'is', label: 'Is/Are', options: ['is it', 'is there', 'are there'] },
  { id: 'has', label: 'Has/Does/Anyone', options: ['has anyone', 'does anyone', 'has it', 'does it'] },
  { id: 'where', label: 'Where', options: ['where is', 'where can', 'where do'] },
]

const DATE_FILTERS = [
  { id: 'any', label: 'Any time', value: '' },
  { id: 'day', label: 'Past 24 hours', value: 'qdr:d' },
  { id: 'week', label: 'Past week', value: 'qdr:w' },
  { id: 'month', label: 'Past month', value: 'qdr:m' },
  { id: 'year', label: 'Past year', value: 'qdr:y' },
]

const SORT_OPTIONS = [
  { id: 'relevance', label: 'Relevance', value: '' },
  { id: 'date', label: 'Most recent', value: 'sort:date' },
]

const STORAGE_KEY = 'quora-search-state'
const DARK_KEY = 'quora-search-dark'

function getInitialSelected() {
  const obj: Record<string, boolean> = {}
  PATTERN_GROUPS.forEach((g) => g.options.forEach((o) => (obj[o] = false)))
  return obj
}

export default function App() {
  const [topic, setTopic] = useState('')
  const [customKeyword, setCustomKeyword] = useState('')
  const [selectedPatterns, setSelectedPatterns] = useState<Record<string, boolean>>(getInitialSelected)
  const [otherPatternsText, setOtherPatternsText] = useState('')
  const [copied, setCopied] = useState(false)
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const map: Record<string, boolean> = {}
    PATTERN_GROUPS.forEach((g) => (map[g.id] = true))
    return map
  })
  const [darkMode, setDarkMode] = useState(false)
  
  // Advanced Filters
  const [dateFilter, setDateFilter] = useState('any')
  const [sortBy, setSortBy] = useState('relevance')
  const [showAdvanced, setShowAdvanced] = useState(false)

  // refs for group-level indeterminate checkboxes
  const groupRefs = useRef<Record<string, HTMLInputElement | null>>({})

  // Load saved state
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const s = JSON.parse(raw)
        if (typeof s.topic === 'string') setTopic(s.topic)
        if (typeof s.customKeyword === 'string') setCustomKeyword(s.customKeyword)
        if (typeof s.otherPatternsText === 'string') setOtherPatternsText(s.otherPatternsText)
        if (s.selectedPatterns && typeof s.selectedPatterns === 'object') {
          setSelectedPatterns((prev) => ({ ...prev, ...s.selectedPatterns }))
        }
        if (typeof s.dateFilter === 'string') setDateFilter(s.dateFilter)
        if (typeof s.sortBy === 'string') setSortBy(s.sortBy)
        if (typeof s.showAdvanced === 'boolean') setShowAdvanced(s.showAdvanced)
      }
      const d = localStorage.getItem(DARK_KEY)
      if (d === 'true') setDarkMode(true)
    } catch (e) {
      // ignore
    }
  }, [])

  // Persist state
  useEffect(() => {
    const payload = { topic, customKeyword, selectedPatterns, otherPatternsText, dateFilter, sortBy, showAdvanced }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  }, [topic, customKeyword, selectedPatterns, otherPatternsText, dateFilter, sortBy, showAdvanced])

  // Dark mode side effect
  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
    localStorage.setItem(DARK_KEY, darkMode ? 'true' : 'false')
  }, [darkMode])

  // Update indeterminate state for group checkboxes when selections change
  useEffect(() => {
    PATTERN_GROUPS.forEach((g) => {
      const total = g.options.length
      const selectedCount = g.options.filter((o) => selectedPatterns[o]).length
      const ref = groupRefs.current[g.id]
      if (ref) ref.indeterminate = selectedCount > 0 && selectedCount < total
    })
  }, [selectedPatterns])

  const toggleOption = (option: string) => {
    setSelectedPatterns((prev) => ({ ...prev, [option]: !prev[option] }))
  }

  const setGroupAll = (group: PatternGroup, value: boolean) => {
    setSelectedPatterns((prev) => {
      const next = { ...prev }
      group.options.forEach((o) => (next[o] = value))
      return next
    })
  }

  const parsedOtherPatterns = useMemo(() => {
    return otherPatternsText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
  }, [otherPatternsText])

  const activePatterns = useMemo(() => {
    const sel = Object.keys(selectedPatterns).filter((k) => selectedPatterns[k])
    return [...sel, ...parsedOtherPatterns]
  }, [selectedPatterns, parsedOtherPatterns])

  const query = useMemo(() => {
    const parts: string[] = ['site:quora.com']
    if (topic.trim()) parts.push(`"${topic.trim()}"`)
    if (customKeyword.trim()) parts.push(`"${customKeyword.trim()}"`)
    if (activePatterns.length > 0) {
      const quoted = activePatterns.map((p) => `"${p}"`)
      parts.push(`(${quoted.join(' OR ')})`)
    }
    return parts.join(' ')
  }, [topic, customKeyword, activePatterns])

  const handleReset = () => {
    setTopic('')
    setCustomKeyword('')
    setSelectedPatterns(getInitialSelected())
    setOtherPatternsText('')
    setDateFilter('any')
    setSortBy('relevance')
    setCopied(false)
    localStorage.removeItem(STORAGE_KEY)
  }

  const handleSearch = () => {
    let url = 'https://www.google.com/search?q=' + encodeURIComponent(query)
    
    // Add date filter
    const selectedDateFilter = DATE_FILTERS.find(f => f.id === dateFilter)
    if (selectedDateFilter && selectedDateFilter.value) {
      url += `&tbs=${selectedDateFilter.value}`
    }
    
    // Add sort option
    const selectedSort = SORT_OPTIONS.find(s => s.id === sortBy)
    if (selectedSort && selectedSort.value) {
      url += `&tbs=${selectedSort.value}`
    }
    
    window.open(url, '_blank', 'noopener')
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(query)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch (e) {
      // ignore
    }
  }

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-6 lg:p-8">
      <div className="w-full app-max mx-auto flex flex-col min-h-[70vh]">
        {/* Modern Header with gradient and better spacing */}
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4 animate-fade-in">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-indigo-500/30">
                Q
              </div>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold leading-tight bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Quora Search Builder
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1.5">
                Compose advanced Google queries for Quora questions
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <button
              className="btn btn-danger"
              onClick={handleReset}
              aria-label="Reset all inputs"
            >
              <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset
            </button>
            <button
              className="btn btn-primary"
              onClick={handleSearch}
              aria-label="Search on Google"
            >
              <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search
            </button>
            <label className="flex items-center gap-2.5 text-sm px-3 py-2 rounded-xl bg-gray-100/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 cursor-pointer hover:bg-gray-200/50 dark:hover:bg-gray-800/80 transition-all">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={(e) => setDarkMode(e.target.checked)}
                className="h-4 w-4 accent-indigo-600"
              />
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </label>
          </div>
        </header>

        <main className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Left: Controls */}
          <section className="card animate-fade-in">
            <div className="space-y-6">
              {/* Topic Input */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  <svg className="w-4 h-4 inline mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  Quora Space or Topic
                </label>
                <input
                  className="input"
                  placeholder="e.g., Artificial Intelligence, Startup..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 ml-1">
                  Optional — will be included as a quoted phrase
                </p>
              </div>

              {/* Question Patterns */}
              <div>
                <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
                  <svg className="w-4 h-4 inline mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Question Patterns
                </label>
                <div className="space-y-3">
                  {PATTERN_GROUPS.map((g) => {
                    const selectedCount = g.options.filter((o) => selectedPatterns[o]).length
                    const allSelected = selectedCount === g.options.length && g.options.length > 0
                      return (
                        <div key={g.id} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 bg-gradient-to-br from-gray-50/50 to-gray-100/30 dark:from-gray-800/30 dark:to-gray-900/30 backdrop-blur-sm hover:shadow-md transition-all duration-200">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <input
                                ref={(el) => { groupRefs.current[g.id] = el }}
                                type="checkbox"
                                checked={allSelected}
                                onChange={(e) => setGroupAll(g, e.target.checked)}
                                className="h-4 w-4 accent-indigo-600 cursor-pointer"
                                aria-label={`Select all ${g.label}`}
                              />
                              <button
                                className="text-left font-semibold text-gray-800 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                onClick={() => setExpanded((prev) => ({ ...prev, [g.id]: !prev[g.id] }))}
                              >
                                {g.label}
                              </button>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-white/60 dark:bg-gray-800/60 px-2 py-1 rounded-lg">
                                {selectedCount}/{g.options.length}
                              </span>
                              <svg 
                                className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${expanded[g.id] ? 'rotate-180' : ''}`}
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </div>
                          {expanded[g.id] && (
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 pt-2">
                              {g.options.map((o) => (
                                <label key={o} className="inline-flex items-center group">
                                  <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={!!selectedPatterns[o]}
                                    onChange={() => toggleOption(o)}
                                    aria-checked={!!selectedPatterns[o]}
                                  />
                                  <span className="pattern-chip peer-checked:bg-gradient-to-r peer-checked:from-indigo-600 peer-checked:to-blue-600 peer-checked:text-white peer-checked:border-indigo-600 peer-checked:shadow-lg peer-checked:shadow-indigo-500/30 w-full justify-start">
                                    <svg viewBox="0 0 20 20" fill="none" className="w-3.5 h-3.5 opacity-0 peer-checked:opacity-100 transition-all" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                      <path d="M4.5 10.5l3 3 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span className="truncate">{o}</span>
                                  </span>
                                </label>
                              ))}
                            </div>
                          )}
                        </div>
                      )
                  })}

                  {/* Other group: custom patterns */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 bg-gradient-to-br from-purple-50/50 to-pink-50/30 dark:from-purple-950/20 dark:to-pink-950/20 backdrop-blur-sm hover:shadow-md transition-all duration-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <span className="font-semibold text-gray-800 dark:text-gray-100">Custom Patterns</span>
                      </div>
                      <div className="text-xs font-medium text-purple-600 dark:text-purple-400 bg-white/60 dark:bg-gray-800/60 px-2 py-1 rounded-lg">
                        {parsedOtherPatterns.length}
                      </div>
                    </div>
                    <div>
                      <input
                        placeholder="e.g., how about, what about, why not"
                        className="input"
                        value={otherPatternsText}
                        onChange={(e) => setOtherPatternsText(e.target.value)}
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 ml-1">
                        Comma-separated custom question patterns
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Custom Keyword */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  <svg className="w-4 h-4 inline mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  Additional Keyword or Phrase
                </label>
                <input
                  className="input"
                  placeholder="e.g., AI agents, startup ideas, productivity tips"
                  value={customKeyword}
                  onChange={(e) => setCustomKeyword(e.target.value)}
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 ml-1">
                  Extra keyword to refine your search
                </p>
              </div>

              {/* Advanced Filters */}
              <div className="border-t border-gray-200/50 dark:border-gray-700/50 pt-6">
                <button
                  className="flex items-center justify-between w-full text-left mb-4"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                >
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2 cursor-pointer">
                    <svg className="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                    Advanced Filters
                  </label>
                  <svg 
                    className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${showAdvanced ? 'rotate-180' : ''}`}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showAdvanced && (
                  <div className="space-y-4 animate-fade-in">
                    {/* Date Filter */}
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        <svg className="w-4 h-4 inline mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Date Range
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {DATE_FILTERS.map((filter) => (
                          <label key={filter.id} className="inline-flex items-center group">
                            <input
                              type="radio"
                              className="sr-only peer"
                              name="dateFilter"
                              value={filter.id}
                              checked={dateFilter === filter.id}
                              onChange={(e) => setDateFilter(e.target.value)}
                            />
                            <span className="pattern-chip peer-checked:bg-gradient-to-r peer-checked:from-indigo-600 peer-checked:to-blue-600 peer-checked:text-white peer-checked:border-indigo-600 peer-checked:shadow-lg peer-checked:shadow-indigo-500/30 w-full justify-center text-center">
                              <svg viewBox="0 0 20 20" fill="none" className="w-3.5 h-3.5 opacity-0 peer-checked:opacity-100 transition-all" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                <path d="M4.5 10.5l3 3 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                              <span className="truncate text-xs">{filter.label}</span>
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Sort Options */}
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        <svg className="w-4 h-4 inline mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                        </svg>
                        Sort By
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {SORT_OPTIONS.map((option) => (
                          <label key={option.id} className="inline-flex items-center group">
                            <input
                              type="radio"
                              className="sr-only peer"
                              name="sortBy"
                              value={option.id}
                              checked={sortBy === option.id}
                              onChange={(e) => setSortBy(e.target.value)}
                            />
                            <span className="pattern-chip peer-checked:bg-gradient-to-r peer-checked:from-indigo-600 peer-checked:to-blue-600 peer-checked:text-white peer-checked:border-indigo-600 peer-checked:shadow-lg peer-checked:shadow-indigo-500/30 w-full justify-center text-center">
                              <svg viewBox="0 0 20 20" fill="none" className="w-3.5 h-3.5 opacity-0 peer-checked:opacity-100 transition-all" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                <path d="M4.5 10.5l3 3 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                              <span className="truncate text-xs">{option.label}</span>
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Active Filters Summary */}
                    {(dateFilter !== 'any' || sortBy !== 'relevance') && (
                      <div className="mt-3 p-3 bg-indigo-50/50 dark:bg-indigo-950/20 rounded-lg border border-indigo-100 dark:border-indigo-900/30">
                        <p className="text-xs font-medium text-indigo-700 dark:text-indigo-300 mb-2">Active Filters:</p>
                        <div className="flex flex-wrap gap-2">
                          {dateFilter !== 'any' && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-white dark:bg-gray-800 rounded-md text-xs border border-indigo-200 dark:border-indigo-800">
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {DATE_FILTERS.find(f => f.id === dateFilter)?.label}
                            </span>
                          )}
                          {sortBy !== 'relevance' && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-white dark:bg-gray-800 rounded-md text-xs border border-indigo-200 dark:border-indigo-800">
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                              </svg>
                              {SORT_OPTIONS.find(s => s.id === sortBy)?.label}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Right: Preview + actions */}
          <aside className="card animate-fade-in self-start" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Query Preview
              </label>
              <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100/50 dark:bg-gray-800/50 px-2.5 py-1 rounded-lg">
                Live update
              </div>
            </div>
            
            <div>
              <textarea
                readOnly
                value={query}
                rows={6}
                className="preview resize-none"
              />
              
              {/* Show active filters in preview */}
              {(dateFilter !== 'any' || sortBy !== 'relevance') && (
                <div className="mt-3 p-2.5 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-lg border border-amber-200 dark:border-amber-900/30">
                  <p className="text-xs font-medium text-amber-800 dark:text-amber-300 mb-1.5 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Filters will be applied on search:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {dateFilter !== 'any' && (
                      <span className="text-xs px-2 py-0.5 bg-white dark:bg-gray-800 rounded border border-amber-300 dark:border-amber-800 text-amber-700 dark:text-amber-300">
                        {DATE_FILTERS.find(f => f.id === dateFilter)?.label}
                      </span>
                    )}
                    {sortBy !== 'relevance' && (
                      <span className="text-xs px-2 py-0.5 bg-white dark:bg-gray-800 rounded border border-amber-300 dark:border-amber-800 text-amber-700 dark:text-amber-300">
                        {SORT_OPTIONS.find(s => s.id === sortBy)?.label}
                      </span>
                    )}
                  </div>
                </div>
              )}
              
              <div className="mt-4 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center gap-3 flex-wrap">
                  <button
                    className="btn btn-ghost flex-1 sm:flex-initial"
                    onClick={handleCopy}
                  >
                    {copied ? (
                      <>
                        <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Copy Query
                      </>
                    )}
                  </button>
                  <button
                    className="btn btn-primary flex-1 sm:flex-initial"
                    onClick={handleSearch}
                  >
                    <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Search on Google
                  </button>
                </div>
                
                <div className="mt-4 p-3 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/20 dark:to-blue-950/20 rounded-xl border border-indigo-100 dark:border-indigo-900/30">
                  <p className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-2">
                    <svg className="w-4 h-4 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>
                      This query will search Google for Quora questions matching your selected patterns and keywords. Review before searching.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </main>
        
        {/* Modern Footer */}
        <footer className="mt-8 pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <span>Built with</span>
              <svg className="w-4 h-4 text-red-500 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              <span>for better Quora searches</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-lg font-mono">v1.0.0</span>
              <button
                className="text-xs underline hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                onClick={handleReset}
              >
                Clear all data
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
