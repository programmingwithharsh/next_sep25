// App Router equivalent of SSR
export default async function SSRAppDemo() {
    // This runs on the SERVER for each request
    console.log('SSR App component running on SERVER for each request')
    
    // Simulate fetching data from API/database
    const posts = [
        {
            id: 1,
            title: 'Server Post 1 (App Router)',
            content: 'This post was fetched on the server.',
            serverTime: new Date().toISOString()
        },
        {
            id: 2,
            title: 'Server Post 2 (App Router)',
            content: 'This post was also fetched on the server.',
            serverTime: new Date().toISOString()
        },
        {
            id: 3,
            title: 'Server Post 3 (App Router)',
            content: 'Fresh data from the server every time!',
            serverTime: new Date().toISOString()
        }
    ]
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100))
    
    const requestTime = new Date().toISOString()
    
    return (
        <div className="container mt-4">
            <h1>SSR App Router Demo</h1>
            <p><strong>Request Time:</strong> {requestTime}</p>
            <p>This page is rendered on the SERVER for each request!</p>
            
            <h2>Posts (Server Data)</h2>
            <ul className="list-group">
                {posts.map(post => (
                    <li key={post.id} className="list-group-item">
                        <h5>{post.title}</h5>
                        <p>{post.content}</p>
                        <small>Server rendered at: {post.serverTime}</small>
                    </li>
                ))}
            </ul>
        </div>
    )
}

// Force server-side rendering
export const dynamic = 'force-dynamic'
