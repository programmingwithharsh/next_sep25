// App Router equivalent of SSG
export default function SSGAppDemo() {
    // This data is fetched at build time
    const posts = [
        {
            id: 1,
            title: 'First Post',
            content: 'This is the first post content.'
        },
        {
            id: 2,
            title: 'Second Post', 
            content: 'This is the second post content.'
        },
        {
            id: 3,
            title: 'Third Post',
            content: 'This is the third post content.'
        }
    ]
    
    const buildTime = new Date().toISOString()
    
    return (
        <div className="container mt-4">
            <h1>SSG App Router Demo</h1>
            <p><strong>Build Time:</strong> {buildTime}</p>
            <p>This page was generated at build time!</p>
            
            <h2>Posts (Static Data)</h2>
            <ul className="list-group">
                {posts.map(post => (
                    <li key={post.id} className="list-group-item">
                        <h5>{post.title}</h5>
                        <p>{post.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

// Force static generation
export const dynamic = 'force-static'
