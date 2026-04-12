import React from 'react';

interface SampleHeaderProps {
  title: string;
  description: string;
  coreFeatures: string[];
  usageScenarios: string;
}

const SampleHeader: React.FC<SampleHeaderProps> = ({ title, description, coreFeatures, usageScenarios }) => {
  return (
    <div className="page-header" style={{ marginBottom: '16px' }}>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '0 0 8px 0', color: '#111827' }}>{title}</h1>
      <p style={{ color: '#4b5563', fontSize: '1rem', margin: 0 }}>{description}</p>
      
      <div style={{ marginTop: '16px', display: 'flex', gap: '16px' }}>
        <div style={{ flex: 1, padding: '16px', backgroundColor: '#f0fdfa', borderRadius: '8px', border: '1px solid #ccfbf1' }}>
          <h3 style={{ color: '#115e59', marginBottom: '8px', fontSize: '1.05rem', fontWeight: 700 }}>🔑 핵심 AG Grid 옵션</h3>
          <ul style={{ paddingLeft: '20px', color: '#134e4a', fontSize: '0.95rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {coreFeatures.map((feature, idx) => (
              <li key={idx} dangerouslySetInnerHTML={{ __html: feature }} />
            ))}
          </ul>
        </div>
        
        <div style={{ flex: 1, padding: '16px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ color: '#334155', marginBottom: '8px', fontSize: '1.05rem', fontWeight: 700 }}>💼 실무 활용 예시</h3>
          <p style={{ color: '#475569', fontSize: '0.95rem', margin: 0, lineHeight: '1.5' }}>
            {usageScenarios}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SampleHeader;
