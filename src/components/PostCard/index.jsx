export default function PostCard({ post, onClick }) {
  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div 
      className="card cursor-pointer hover:shadow-xl transition-all duration-200"
      onClick={() => onClick(post)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(post);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Ver detalhes do post: ${post.title}`}
    >
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
          {post.title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          {truncateText(post.body)}
        </p>
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <span className="text-xs text-gray-500">
            Post #{post.id}
          </span>
          <div className="text-blue-600 text-sm font-medium">
            Ler mais →
          </div>
        </div>
      </div>
    </div>
  );
}
