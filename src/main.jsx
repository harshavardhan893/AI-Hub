
import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Search,
  Sparkles,
  ArrowUpRight,
  WandSparkles,
  Sun,
  Moon,
  Menu,
  X,
  Star,
  Zap,
  Bot,
  ChevronRight
} from 'lucide-react';
import './style.css';

const categories = [
  {
    name: 'Writing & Creative',
    icon: '✍️',
    color: 'violet',
    desc: 'Write, rewrite, polish and create',
    tools: [
      'StoryForge AI', 'NovelCraft AI', 'ScriptMaster AI',
      'EmailGenius AI', 'ProposalPro AI', 'ResumeBuilder AI',
      'CoverLetter AI', 'GrammarFix AI', 'ParaphrasePro AI',
      'PlagiarismCheck AI'
    ]
  },
  {
    name: 'Marketing & Business',
    icon: '📈',
    color: 'blue',
    desc: 'Grow brands and businesses',
    tools: [
      'AdCopy Genius', 'BrandName AI', 'SloganMaker AI',
      'SalesPitch AI', 'ProductDesc AI', 'CompetitorAnalyzer AI',
      'MarketResearch AI', 'BusinessPlan AI', 'CustomerPersona AI',
      'CampaignPlanner AI'
    ]
  },
  {
    name: 'Image & Design',
    icon: '🎨',
    color: 'pink',
    desc: 'Create visuals and design assets',
    tools: [
      'LogoMaker AI', 'PosterGen AI', 'ThumbnailCraft AI',
      'ImageEnhancer AI', 'BackgroundRemover AI', 'PhotoRestorer AI',
      'AvatarCreator AI', 'InteriorDesign AI', 'FashionSketch AI',
      'InfographicMaker AI'
    ]
  },
  {
    name: 'Video & Audio',
    icon: '🎬',
    color: 'orange',
    desc: 'Video, sound, voice and animation',
    tools: [
      'VideoScript AI', 'VideoEditor AI', 'VoiceoverGen AI',
      'PodcastCreator AI', 'AudioCleaner AI', 'MusicComposer AI',
      'SubtitleMaker AI', 'VideoSummarizer AI', 'AnimationStudio AI',
      'LipSync AI'
    ]
  },
  {
    name: 'Productivity',
    icon: '⚡',
    color: 'green',
    desc: 'Work smarter and stay organized',
    tools: [
      'MeetingMinutes AI', 'TaskManager AI', 'ScheduleGenius AI',
      'NoteMaster AI', 'PDFChat AI', 'DocumentReader AI',
      'PresentationMaker AI', 'SpreadsheetGenius AI',
      'DataVisualizer AI', 'WorkflowBuilder AI'
    ]
  },
  {
    name: 'Education & Learning',
    icon: '🎓',
    color: 'cyan',
    desc: 'Learn, practice and prepare',
    tools: [
      'MathSolver AI', 'ScienceTutor AI', 'LanguageCoach AI',
      'VocabularyBuilder AI', 'QuizGenerator AI', 'FlashcardGenius AI',
      'ExamPrep AI', 'CodingTutor AI', 'HistoryExplorer AI',
      'StudyPlanner AI'
    ]
  },
  {
    name: 'Finance & E-commerce',
    icon: '💰',
    color: 'yellow',
    desc: 'Finance, stores and products',
    tools: [
      'BudgetPlanner AI', 'ExpenseTracker AI', 'InvoiceMaker AI',
      'TaxAssistant AI', 'FinancialReport AI', 'EcommerceWriter AI',
      'ShopifyStore AI', 'ProductResearch AI', 'PricingOptimizer AI',
      'ReviewAnalyzer AI'
    ]
  },
  {
    name: 'Lifestyle',
    icon: '🌿',
    color: 'lime',
    desc: 'Ideas for everyday living',
    tools: [
      'MealPlanner AI', 'RecipeGen AI', 'FitnessCoach AI',
      'MeditationGuide AI', 'TravelPlanner AI', 'GiftFinder AI',
      'PetCare Assistant', 'GardeningGuru AI', 'FashionStylist AI',
      'HomeOrganizer AI'
    ]
  }
];

const descriptions = {
  'StoryForge AI': 'Turn a spark of imagination into a story.',
  'NovelCraft AI': 'Develop chapters, characters and plot arcs.',
  'ScriptMaster AI': 'Structure scenes and dialogue for scripts.',
  'EmailGenius AI': 'Draft clear and professional emails.',
  'ProposalPro AI': 'Build persuasive business proposals.',
  'ResumeBuilder AI': 'Create polished, role-focused resumes.',
  'CoverLetter AI': 'Write tailored cover letters.',
  'GrammarFix AI': 'Improve grammar, clarity and spelling.',
  'ParaphrasePro AI': 'Rewrite text in a new style.',
  'PlagiarismCheck AI': 'Review text for potential originality concerns.',

  'AdCopy Genius': 'Create persuasive advertising copy.',
  'BrandName AI': 'Brainstorm memorable brand names.',
  'SloganMaker AI': 'Generate catchy slogans.',
  'SalesPitch AI': 'Build a compelling sales pitch.',
  'ProductDesc AI': 'Write engaging product descriptions.',
  'CompetitorAnalyzer AI': 'Explore competitors and positioning.',
  'MarketResearch AI': 'Draft market research and insights.',
  'BusinessPlan AI': 'Outline a business plan.',
  'CustomerPersona AI': 'Build useful customer profiles.',
  'CampaignPlanner AI': 'Plan a marketing campaign.',

  'LogoMaker AI': 'Explore logo concepts and directions.',
  'PosterGen AI': 'Create promotional poster concepts.',
  'ThumbnailCraft AI': 'Plan attention-grabbing thumbnails.',
  'ImageEnhancer AI': 'Improve image quality and clarity.',
  'BackgroundRemover AI': 'Prepare images with clean backgrounds.',
  'PhotoRestorer AI': 'Restore old or damaged photographs.',
  'AvatarCreator AI': 'Create custom avatar concepts.',
  'InteriorDesign AI': 'Explore interior design ideas.',
  'FashionSketch AI': 'Develop fashion sketch concepts.',
  'InfographicMaker AI': 'Turn information into infographic outlines.',

  'VideoScript AI': 'Write engaging video scripts.',
  'VideoEditor AI': 'Plan edits and video workflows.',
  'VoiceoverGen AI': 'Prepare narration and voiceover scripts.',
  'PodcastCreator AI': 'Outline and draft podcast episodes.',
  'AudioCleaner AI': 'Guide audio cleanup workflows.',
  'MusicComposer AI': 'Create original music ideas and briefs.',
  'SubtitleMaker AI': 'Create subtitle text and timing drafts.',
  'VideoSummarizer AI': 'Summarize video transcripts.',
  'AnimationStudio AI': 'Plan animated scenes.',
  'LipSync AI': 'Plan audio and lip-sync workflows.',

  'MeetingMinutes AI': 'Turn notes into meeting minutes.',
  'TaskManager AI': 'Organize tasks and priorities.',
  'ScheduleGenius AI': 'Create realistic daily schedules.',
  'NoteMaster AI': 'Organize and summarize notes.',
  'PDFChat AI': 'Ask questions about document content.',
  'DocumentReader AI': 'Extract and organize document information.',
  'PresentationMaker AI': 'Create slide outlines and presentations.',
  'SpreadsheetGenius AI': 'Analyze spreadsheet data.',
  'DataVisualizer AI': 'Recommend charts for your data.',
  'WorkflowBuilder AI': 'Map and automate workflows.',

  'MathSolver AI': 'Work through math step by step.',
  'ScienceTutor AI': 'Understand scientific concepts.',
  'LanguageCoach AI': 'Practice language skills.',
  'VocabularyBuilder AI': 'Learn and review vocabulary.',
  'QuizGenerator AI': 'Generate practice quizzes.',
  'FlashcardGenius AI': 'Create study flashcards.',
  'ExamPrep AI': 'Build exam preparation resources.',
  'CodingTutor AI': 'Learn programming step by step.',
  'HistoryExplorer AI': 'Explore historical topics.',
  'StudyPlanner AI': 'Build personalized study plans.',

  'BudgetPlanner AI': 'Plan a monthly budget.',
  'ExpenseTracker AI': 'Categorize and review spending.',
  'InvoiceMaker AI': 'Draft professional invoices.',
  'TaxAssistant AI': 'Organize tax questions and calculations.',
  'FinancialReport AI': 'Summarize financial information.',
  'EcommerceWriter AI': 'Write online store content.',
  'ShopifyStore AI': 'Plan store pages and content.',
  'ProductResearch AI': 'Explore product opportunities.',
  'PricingOptimizer AI': 'Explore pricing approaches.',
  'ReviewAnalyzer AI': 'Summarize themes from customer reviews.',

  'MealPlanner AI': 'Plan meals for your week.',
  'RecipeGen AI': 'Create recipes from ingredients.',
  'FitnessCoach AI': 'Plan workouts and fitness routines.',
  'MeditationGuide AI': 'Create guided mindfulness sessions.',
  'TravelPlanner AI': 'Build travel itineraries.',
  'GiftFinder AI': 'Find thoughtful gift ideas.',
  'PetCare Assistant': 'Get general pet-care information.',
  'GardeningGuru AI': 'Plan gardening tasks and tips.',
  'FashionStylist AI': 'Explore outfit ideas.',
  'HomeOrganizer AI': 'Organize rooms and routines.'
};

function App() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All tools');
  const [dark, setDark] = useState(true);
  const [selected, setSelected] = useState(null);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mobileMenu, setMobileMenu] = useState(false);
  const [loading, setLoading] = useState(false);

  const allTools = useMemo(
    () =>
      categories.flatMap(c =>
        c.tools.map(t => ({
          name: t,
          category: c.name,
          icon: c.icon,
          color: c.color
        }))
      ),
    []
  );

  const filtered = useMemo(
    () =>
      allTools.filter(
        t =>
          (activeCategory === 'All tools' ||
            t.category === activeCategory) &&
          `${t.name} ${t.category} ${descriptions[t.name] || ''}`
            .toLowerCase()
            .includes(query.toLowerCase())
      ),
    [allTools, activeCategory, query]
  );

  const choose = tool => {
    setSelected(tool);
    setInput('');
    setOutput('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Connect Generate button to the live Render backend
  const generate = async () => {
    if (!input.trim() || loading) return;

    setLoading(true);
    setOutput('Generating AI response...');

    try {
      const response = await fetch(
        'https://ai-hub-backend-t9t0.onrender.com/api/generate',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            tool_name: selected.name,
            category: selected.category,
            prompt: input
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'AI generation failed');
      }

      setOutput(data.response);
    } catch (error) {
      console.error('AI generation error:', error);
      setOutput('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={dark ? 'app dark' : 'app light'}>
      <header className="header">
        <a
          className="brand"
          href="#home"
          onClick={() => setSelected(null)}
        >
          <span className="brand-icon">
            <Sparkles size={19} />
          </span>
          <span>
            AI<span className="brand-accent">-Hub</span>
          </span>
        </a>

        <nav className="nav">
          <a href="#home" onClick={() => setSelected(null)}>Home</a>
          <a href="#categories">Categories</a>
          <a href="#tools">Explore tools</a>
        </nav>

        <div className="header-actions">
          <button
            className="icon-btn"
            title="Toggle theme"
            onClick={() => setDark(!dark)}
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            className="menu-btn"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <X /> : <Menu />}
          </button>

          <a className="small-cta" href="#tools">
            Explore tools <ArrowUpRight size={16} />
          </a>
        </div>
      </header>

      {mobileMenu && (
        <div className="mobile-nav">
          <a href="#home">Home</a>
          <a href="#categories">Categories</a>
          <a href="#tools">Explore tools</a>
        </div>
      )}

      <main id="home">
        {selected ? (
          <section className="tool-workspace">
            <button
              className="back"
              onClick={() => setSelected(null)}
            >
              ← Back to tools
            </button>

            <div className="workspace-card">
              <div className={`tool-icon ${selected.color}`}>
                {selected.icon}
              </div>

              <span className="eyebrow">{selected.category}</span>
              <h1>{selected.name}</h1>
              <p>{descriptions[selected.name]}</p>

              <label htmlFor="tool-input">Your prompt</label>

              <textarea
                id="tool-input"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={`Tell ${selected.name} what you'd like to create...`}
                rows={6}
              />

              <div className="character-count">
                {input.length} characters
              </div>

              <button
                className="primary"
                onClick={generate}
                disabled={loading}
              >
                <WandSparkles size={18} />
                {loading ? 'Generating...' : 'Generate'}
                <ArrowUpRight size={16} />
              </button>

              {output && (
                <div className="result">
                  <h3>AI response</h3>
                  <pre>{output}</pre>
                  <button
                    className="secondary"
                    onClick={() =>
                      navigator.clipboard?.writeText(output)
                    }
                  >
                    Copy response
                  </button>
                </div>
              )}

              <p className="note">
                Powered by AI-Hub and Groq AI.
              </p>
            </div>
          </section>
        ) : (
          <>
            <section className="hero">
              <div className="hero-glow"></div>

              <div className="eyebrow">
                <span className="eyebrow-dot"></span>
                YOUR ALL-IN-ONE AI DESTINATION
              </div>

              <h1>
                One hub. <span>Limitless AI.</span>
              </h1>

              <p className="hero-copy">
                Discover powerful AI tools to create, learn, work and
                bring your ideas to life — all in one place.
              </p>

              <div className="hero-search">
                <Search size={19} />
                <input
                  value={query}
                  onChange={e => {
                    setQuery(e.target.value);
                    setActiveCategory('All tools');
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      document.getElementById('tools')?.scrollIntoView({
                        behavior: 'smooth'
                      });
                    }
                  }}
                  placeholder="Search 80+ AI tools..."
                />
                <kbd>⌕</kbd>
              </div>

              <div className="hero-bottom">
                <span><Zap size={15} /> 80+ AI-powered tools</span>
                <span><Bot size={15} /> 8 categories</span>
                <span><Star size={15} /> Built for everyone</span>
              </div>

              <div className="hero-orbit">
                <div className="orbit-center">
                  <Sparkles size={38} />
                </div>
                <span className="orbit-chip chip1">✍️ Writing</span>
                <span className="orbit-chip chip2">🎨 Design</span>
                <span className="orbit-chip chip3">📈 Business</span>
                <span className="orbit-chip chip4">🎓 Learning</span>
                <span className="orbit-chip chip5">⚡ Productivity</span>
              </div>
            </section>

            <section className="categories-section" id="categories">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">EXPLORE BY CATEGORY</span>
                  <h2>
                    Find the right tool for <span>every task.</span>
                  </h2>
                </div>

                <a href="#tools" className="text-link">
                  All tools <ChevronRight size={16} />
                </a>
              </div>

              <div className="category-grid">
                {categories.map(c => (
                  <button
                    key={c.name}
                    className={`category-card ${c.color} ${
                      activeCategory === c.name ? 'active' : ''
                    }`}
                    onClick={() => {
                      setActiveCategory(c.name);
                      setQuery('');
                      document
                        .getElementById('tools')
                        ?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <span className="category-emoji">{c.icon}</span>
                    <span className="category-name">{c.name}</span>
                    <span className="category-desc">{c.desc}</span>
                    <span className="category-count">
                      {c.tools.length} tools <ArrowUpRight size={14} />
                    </span>
                  </button>
                ))}
              </div>
            </section>

            <section className="tools-section" id="tools">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">THE TOOL DIRECTORY</span>
                  <h2>
                    {activeCategory === 'All tools'
                      ? 'Explore AI tools'
                      : activeCategory}
                  </h2>
                  <p className="muted">
                    Pick a tool and start creating.
                  </p>
                </div>

                <button
                  className="filter-reset"
                  onClick={() => {
                    setActiveCategory('All tools');
                    setQuery('');
                  }}
                >
                  View all
                </button>
              </div>

              <div className="tool-filter">
                <Search size={17} />
                <input
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Filter tools..."
                />
                <span>{filtered.length} tools</span>
              </div>

              <div className="tool-grid">
                {filtered.map(t => (
                  <button
                    key={t.name}
                    className="tool-card"
                    onClick={() => choose(t)}
                  >
                    <div className={`tool-icon ${t.color}`}>
                      {t.icon}
                    </div>

                    <div className="tool-card-text">
                      <h3>{t.name}</h3>
                      <p>{descriptions[t.name]}</p>
                      <span className="tool-category">
                        {t.category}
                      </span>
                    </div>

                    <ArrowUpRight
                      className="tool-arrow"
                      size={17}
                    />
                  </button>
                ))}
              </div>

              {filtered.length === 0 && (
                <div className="empty">
                  No tools found. Try a different search.
                </div>
              )}
            </section>
          </>
        )}
      </main>

      <footer>
        <a className="brand" href="#home">
          <span className="brand-icon">
            <Sparkles size={16} />
          </span>
          <span>
            AI<span className="brand-accent">-Hub</span>
          </span>
        </a>

        <span>One hub. Limitless AI.</span>
        <span>AI-Hub · Powered by Groq AI</span>
      </footer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
