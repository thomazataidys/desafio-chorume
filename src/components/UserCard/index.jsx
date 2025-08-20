export default function UserCard({ user, onClick }) {
  return (
    <div 
      className="card cursor-pointer hover:shadow-xl transition-all duration-200"
      onClick={() => onClick(user)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(user);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Ver detalhes de ${user.name}`}
    >
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-blue-600 font-semibold text-lg">
            {user.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {user.name}
          </h3>
          <p className="text-gray-600 text-sm truncate">
            {user.email}
          </p>
          <p className="text-gray-500 text-sm truncate">
            {user.company?.name || 'Empresa não informada'}
          </p>
        </div>
        <div className="text-gray-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
