import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { allSamples, type SampleMenuItem } from '../sampleMenu';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);
  const [searchText, setSearchText] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const searchResults = useMemo(() => {
    const query = searchText.trim().toLowerCase();
    if (!query) return allSamples.slice(0, 8);

    return allSamples
      .filter((sample) => `${sample.label} ${sample.group} ${sample.path}`.toLowerCase().includes(query))
      .slice(0, 10);
  }, [searchText]);

  const showResults = isFocused && (searchText.trim().length > 0 || searchResults.length > 0);

  const closeSearch = () => {
    setSearchText('');
    setIsFocused(false);
  };

  const selectSample = (sample: SampleMenuItem) => {
    closeSearch();
    navigate(sample.path);
  };

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!searchRef.current?.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeSearch();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <header className="app-header">
      <div className="header-left">
        <div className="logo">
          AG<span>Grid</span>
        </div>
      </div>
      <div className="global-search" ref={searchRef}>
        <input
          type="search"
          value={searchText}
          onChange={(event) => {
            setSearchText(event.target.value);
            setIsFocused(true);
          }}
          onFocus={() => setIsFocused(true)}
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              closeSearch();
            }
            if (event.key === 'Enter' && searchResults[0]) {
              selectSample(searchResults[0]);
            }
          }}
          placeholder="전체 가이드 검색..."
          aria-label="전체 가이드 검색"
        />
        {showResults && (
          <div className="global-search-results" onMouseDown={(event) => event.preventDefault()}>
            {searchResults.length > 0 ? (
              searchResults.map((sample) => (
                <button key={sample.path} type="button" onClick={() => selectSample(sample)}>
                  <span>{sample.label}</span>
                  <small>{sample.group}</small>
                </button>
              ))
            ) : (
              <div className="global-search-empty">검색 결과가 없습니다.</div>
            )}
          </div>
        )}
      </div>
      <div className="header-right">
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <div style={{ width: '35px', height: '35px', borderRadius: '50%', backgroundColor: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontWeight: 'bold' }}>
            JS
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
