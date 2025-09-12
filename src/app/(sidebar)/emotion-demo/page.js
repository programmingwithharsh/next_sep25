'use client'
import styled from '@emotion/styled'
import { css, keyframes } from '@emotion/react'

const Card = styled.div`
    border-radius: 12px;
    background: #0d6efd;
    color: #fff;
    padding: 16px;
    box-shadow: 0 0.5rem 1rem rgba(0,0,0,.15);
`

const EmButton = styled.button`
    border: none;
    border-radius: 8px;
    background: #fff;
    color: #0d6efd;
    padding: 8px 14px;
    font-weight: 600;
    cursor: pointer;
    transition: transform .1s ease-in-out;
    &:hover { transform: translateY(-1px); }
`

const subtleText = css`
    opacity: .85;
`

const pulse = keyframes`
    0% { transform: scale(1); }
    50% { transform: scale(1.06); }
    100% { transform: scale(1); }
`

const EmojiBadge = styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    margin-right: 12px;
    background: ${({ mood }) => ({
        happy: '#28a745',
        sad: '#6c757d',
        angry: '#dc3545',
        love: '#e83e8c'
    }[mood] || '#0d6efd')};
    color: #fff;
    font-size: 28px;
    transition: transform .12s ease-in-out, filter .12s ease-in-out;
    &:hover { 
        filter: brightness(1.05);
        animation: ${pulse} .6s ease-in-out;
    }
`

export default function EmotionDemoPage() {
    return (
        <div className="container py-3">
            <h2 className="mb-3">Emotion Demo</h2>
            <Card>
                <p css={subtleText} className="mb-3">This card is styled with Emotion styled-components.</p>
                <EmButton>Emotion Button</EmButton>
            </Card>
            <div className="mt-4">
                <h5 className="mb-2">Emoji (Emotion-styled) Badges</h5>
                <div className="d-flex align-items-center">
                    <EmojiBadge mood="happy" title="Happy">😀</EmojiBadge>
                    <EmojiBadge mood="sad" title="Sad">😢</EmojiBadge>
                    <EmojiBadge mood="angry" title="Angry">😡</EmojiBadge>
                    <EmojiBadge mood="love" title="Love">😍</EmojiBadge>
                </div>
            </div>
        </div>
    )
}


