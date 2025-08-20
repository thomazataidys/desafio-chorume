import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { postService } from '../../services/postService';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';

export default function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingComments, setLoadingComments] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPost();
  }, [id]);

  const loadPost = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await postService.getPostById(id);
      setPost(data);
      loadComments(data.id);
    } catch (err) {
      setError('Erro ao carregar o post. Tente novamente.');
      console.error('Error loading post:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadComments = async (postId) => {
    try {
      setLoadingComments(true);
      const data = await postService.getCommentsByPost(postId);
      setComments(data);
    } catch (err) {
      console.error('Error loading comments:', err);
    } finally {
      setLoadingComments(false);
    }
  };

  const handleBack = () => {
    navigate('/posts');
  };

  if (loading) {
    return <LoadingSpinner size="lg" text="Carregando post..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={loadPost} />;
  }

  if (!post) {
    return <ErrorMessage message="Post não encontrado." />;
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Voltar para Posts
      </button>

      {/* Post Content */}
      <article className="bg-white rounded-lg shadow-md p-6">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
          <div className="flex items-center text-sm text-gray-500">
            <span>Post #{post.id}</span>
            {post.userId && (
              <>
                <span className="mx-2">•</span>
                <span>Usuário #{post.userId}</span>
              </>
            )}
          </div>
        </header>

        <div className="prose max-w-none">
          <p className="text-gray-700 leading-relaxed text-lg">{post.body}</p>
        </div>
      </article>

      {/* Comments Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Comentários ({comments.length})
        </h2>

        {loadingComments ? (
          <LoadingSpinner size="sm" text="Carregando comentários..." />
        ) : comments.length > 0 ? (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="border-l-4 border-blue-500 pl-4 py-2">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{comment.name}</h3>
                  <span className="text-xs text-gray-500">#{comment.id}</span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{comment.email}</p>
                <p className="text-gray-700">{comment.body}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">
            Nenhum comentário encontrado para este post.
          </p>
        )}
      </div>
    </div>
  );
}
