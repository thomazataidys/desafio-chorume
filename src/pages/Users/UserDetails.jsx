import { useState, useEffect } from 'react';
import { userService } from '../../services/userService';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function UserDetails({ user }) {
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(false);

  useEffect(() => {
    if (user) {
      loadUserPosts();
    }
  }, [user]);

  const loadUserPosts = async () => {
    try {
      setLoadingPosts(true);
      const data = await userService.getUserPosts(user.id);
      setPosts(data.slice(0, 3)); // Mostrar apenas os 3 primeiros posts
    } catch (err) {
      console.error('Error loading user posts:', err);
    } finally {
      setLoadingPosts(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* User Info */}
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-bold text-2xl">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="font-medium text-gray-900">Informações de Contato</h3>
            <div className="space-y-1 text-sm">
              <p><span className="font-medium">Telefone:</span> {user.phone}</p>
              <p><span className="font-medium">Website:</span> 
                <a 
                  href={`https://${user.website}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 ml-1"
                >
                  {user.website}
                </a>
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-gray-900">Endereço</h3>
            <div className="space-y-1 text-sm">
              <p>{user.address?.street}</p>
              <p>{user.address?.city}, {user.address?.zipcode}</p>
              <p>{user.address?.suite}</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium text-gray-900">Empresa</h3>
          <div className="text-sm">
            <p><span className="font-medium">Nome:</span> {user.company?.name}</p>
            <p><span className="font-medium">Slogan:</span> {user.company?.catchPhrase}</p>
            <p><span className="font-medium">BS:</span> {user.company?.bs}</p>
          </div>
        </div>
      </div>

      {/* User Posts */}
      <div className="space-y-3">
        <h3 className="font-medium text-gray-900">Posts Recentes</h3>
        
        {loadingPosts ? (
          <LoadingSpinner size="sm" text="Carregando posts..." />
        ) : posts.length > 0 ? (
          <div className="space-y-3">
            {posts.map((post) => (
              <div key={post.id} className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">{post.title}</h4>
                <p className="text-sm text-gray-600 line-clamp-2">{post.body}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">Nenhum post encontrado para este usuário.</p>
        )}
      </div>
    </div>
  );
}
