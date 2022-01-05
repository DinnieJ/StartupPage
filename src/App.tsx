import React from 'react';
import './App.css';
import Article from './components/Article';
import ArticleList from './components/ArticleList';
import Weather from './components/Weather';
import './components/ArticleList.css'

function App() {
  return (
    <div className="bg-black h-screen">
      <div className="bg-gray-900 mx-auto my-0 h-full max-h-screen flex flex-col">
        <div className="h-60">
          <Weather />
        </div>
        <div className="w-full flex-grow overflow-hidden">
          <ArticleList/>
        </div>
      </div>
    </div>
  );
}

export default App;
