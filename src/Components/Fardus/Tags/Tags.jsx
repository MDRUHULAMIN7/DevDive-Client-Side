import React, { useState, useEffect } from 'react';

const Tags = ({ onTagsUpdate, setTags, tags, emptyTags }) => {
  const [inputValue, setInputValue] = useState('');

  const [suggestions, setSuggestions] = useState([]);

  const predefinedTags = [
    // Core Technologies & Languages
    'programming',
    'design',
    'web development',
    'javascript',
    'typescript',
    'python',
    'java',
    'c',
    'c++',
    'c#',
    'ruby',
    'php',
    'html',
    'css',
    'sass',
    'less',
    'sql',
    'bash',
    'shell scripting',
    'kotlin',
    'swift',
    'r',
    'matlab',
    'dart',
    'perl',
    'rust',
    'go',
    'elixir',
  
    // Frontend Development
    'frontend',
    'react',
    'react native',
    'angular',
    'vue.js',
    'next.js',
    'nuxt.js',
    'svelte',
    'tailwind css',
    'bootstrap',
    'bulma',
    'material ui',
    'semantic ui',
    'styled components',
    'responsive design',
    'ui/ux',
    'web accessibility',
    'cross-browser compatibility',
  
    // Backend Development
    'backend',
    'node.js',
    'express.js',
    'django',
    'flask',
    'laravel',
    'ruby on rails',
    'spring boot',
    'nest.js',
    'asp.net',
    'koa.js',
    'fastapi',
  
    // Databases & Data Management
    'database',
    'mysql',
    'postgresql',
    'sqlite',
    'mongodb',
    'firebase',
    'couchdb',
    'neo4j',
    'cassandra',
    'dynamodb',
    'redis',
    'elasticsearch',
    'graph database',
    'data modeling',
    'data warehousing',
    'big data',
  
    // DevOps & Cloud
    'devops',
    'docker',
    'kubernetes',
    'ansible',
    'jenkins',
    'travis ci',
    'circleci',
    'github actions',
    'ci/cd',
    'terraform',
    'aws',
    'azure',
    'gcp',
    'heroku',
    'digitalocean',
    'serverless',
    'cloud computing',
    'load balancing',
    'kafka',
    'rabbitmq',
  
    // APIs & Authentication
    'api development',
    'rest api',
    'graphql',
    'json',
    'xml',
    'jwt',
    'oauth',
    'sso',
    'api security',
    'websockets',
    'firebase authentication',
    'passport.js',
    'api gateway',
  
    // Testing & Quality Assurance
    'testing',
    'unit testing',
    'integration testing',
    'e2e testing',
    'jest',
    'mocha',
    'chai',
    'cypress',
    'puppeteer',
    'selenium',
    'testcafe',
    'junit',
    'mocking',
    'tdd',
    'bdd',
  
    // Version Control & Collaboration
    'version control',
    'git',
    'github',
    'gitlab',
    'bitbucket',
    'svn',
    'mercurial',
    'pull requests',
    'code reviews',
    'pair programming',
    'agile',
    'scrum',
    'kanban',
    'jira',
    'trello',
    'confluence',
  
    // Mobile Development
    'mobile development',
    'react native',
    'flutter',
    'swift',
    'kotlin',
    'xcode',
    'android studio',
    'ionic',
    'cordova',
  
    // Performance & Optimization
    'performance optimization',
    'lazy loading',
    'image optimization',
    'caching',
    'compression',
    'minification',
    'code splitting',
    'service workers',
    'progressive web apps',
    'web performance',
  
    // Security
    'security',
    'encryption',
    'authentication',
    'authorization',
    'csrf',
    'xss',
    'cors',
    'ssl/tls',
    'penetration testing',
    'firewall',
    'ddos protection',
  
    // Machine Learning, AI & Data Science
    'machine learning',
    'deep learning',
    'ai',
    'data science',
    'big data',
    'data mining',
    'data visualization',
    'natural language processing',
    'tensorflow',
    'pytorch',
    'scikit-learn',
    'pandas',
    'numpy',
    'matplotlib',
    'kaggle',
    'jupyter notebooks',
    'hadoop',
    'spark',

    "bugs",
    "problems",
  
    // Blockchain & Cryptography
    'blockchain',
    'cryptocurrency',
    'bitcoin',
    'ethereum',
    'smart contracts',
    'solidity',
    'hyperledger',
    'cryptography',
    'zero knowledge proofs',
  
    // Game Development
    'game development',
    'unity',
    'unreal engine',
    'godot',
    'phaser',
    'panda3d',
    'three.js',
    'webgl',
  
    // Miscellaneous Tools & Technologies
    'npm',
    'yarn',
    'webpack',
    'parcel',
    'gulp',
    'babel',
    'eslint',
    'prettier',
    'vscode',
    'intellij',
    'visual studio',
    'eclipse',
    'netbeans',
    'apache',
    'nginx',
    'graphql',
    'microservices',
    'headless cms',
    'content management',
    'redux',
    'state management',
    'redux saga',
    'rxjs',
    'mobx',
    'storybook',
    'gatsby',
    'electron',
    'figma',
    'adobe xd',
    'sketch',
    'web3',
    'metaverse',
    'seo',
    'a/b testing',
    'user research',
    'heatmaps',
    'analytics',
    'business intelligence',
    'devtools',
    'regex',
  ];
  

  // This useEffect will trigger whenever the tags array changes and will pass the updated tags to the parent component.
  useEffect(() => {
    if (onTagsUpdate) {
      onTagsUpdate(tags);
      
    }
  }, [tags, onTagsUpdate]);

  const handleInputChange = (e) => {
    const value = e.target.value.toLowerCase().trim();
    setInputValue(value);

    if (value) {
      const matchedTags = predefinedTags.filter((tag) => tag.includes(value));
      setSuggestions(matchedTags);
    } else {
      setSuggestions([]);
    }
  };

  const handleTagClick = (tag) => {
    if (!tags.includes(tag)) {
      setTags((prevTags) => [...prevTags, tag]);
    }
    setInputValue('');
    setSuggestions([]);
  };

  const handleTagRemove = (tag) => {
    setTags((prevTags) => prevTags.filter((t) => t !== tag));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue) {
      if (!tags.includes(inputValue)) {
        setTags((prevTags) => [...prevTags, inputValue]);
      }
      setInputValue('');
      setSuggestions([]);
      e.preventDefault();
    }
  };

  return (
    <div className="relative">
      <div className={`relative w-full border rounded-2xl ${emptyTags ? "border-red-500" : "border-gray-300 dark:border-gray-500"}`}>
            <div className="relative">
              <input
                id="tag"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className={`w-full text-sm h-[58px] bg-transparent placeholder:text-slate-400 dark:text-gray-100 text-slate-700 rounded-md px-4 transition duration-300 ease outline-none
                        ${inputValue? 'pt-2' : ''}`}
              />
              <label
                htmlFor="tag"
                className={`absolute cursor-text px-1 left-2.5 bg-transparent text-slate-400 transition-all transform origin-left peer-focus:left-2.5
        ${inputValue ? 'top-[5px] left-2.5 scale-90 text-xs' : 'top-[50%] translate-y-[-50%] text-sm'}`}
              >
                Tags <span className="text-red-500 text-lg absolute top-[-3px] -right-2">*</span>
              </label>
              {emptyTags && <span className="text-right text-xs text-red-500 absolute left-1 bottom-[-25px]">Tag is Required</span>}
            </div>
          </div>
      
      {suggestions.length > 0 && (
        <div
          id="tags-suggestions"
          className={`${emptyTags ? "mt-8" : "mt-2"} border border-gray-300 rounded-lg shadow-md max-h-32 overflow-y-auto`}
        >
          {suggestions.map((suggestion) => (
            <div
              key={suggestion}
              className="p-2 cursor-pointer text-sm bg-transparent"
              onClick={() => handleTagClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
      <div id="tags-container" className={`${emptyTags ? "mt-8" : "mt-2"} flex flex-wrap gap-2 ${emptyTags && inputValue.length > 0 ? "-mt-[-10px]" : ""}`}>
        {tags.map((tag) => (
          <div
            key={tag}
            className="px-3 border border-gray-300 dark:border-gray-500 py-1 rounded-full flex items-center space-x-2"
          >
            <span className="tag-text text-xs">{tag}</span>
            <span
              className="tag-close cursor-pointer text-gray-600 text-sm"
              onClick={() => handleTagRemove(tag)}
            >
              x
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tags;
