"use client";
import WithoutContext from './WithoutContext';
import WithContext from './WithContext';

export default function Page() {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div style={{ padding: 16, border: '1px solid #ddd', borderRadius: 8 }}>
                <WithoutContext />
            </div>
            <div style={{ padding: 16, border: '1px solid #ddd', borderRadius: 8 }}>
                <WithContext />
            </div>
        </div>
    );
}


