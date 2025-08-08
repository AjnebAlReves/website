import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ExternalLink, 
  Github, 
  Server, 
  Gamepad2, 
  Video, 
  Bot, 
  Church,
  ArrowLeft,
  Globe,
  Star,
  Calendar,
  Code,
  Sun,
  Moon
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  url?: string;
  githubUrl?: string;
  icon: React.ReactNode;
  category: 'featured' | 'other';
  tags: string[];
  status: 'active' | 'completed' | 'ongoing';
  year: string;
}

interface PortfolioProps {
  onNavigateHome: () => void;
  isDark: boolean;
  toggleTheme: () => void;
}

const Portfolio: React.FC<PortfolioProps> = ({ onNavigateHome, isDark, toggleTheme }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'featured' | 'other'>('all');


  const projects: Project[] = [
    {
      id: 'flyxnodes',
      title: 'FlyxNodes',
      description: 'Servicio de hosting gratuito y premium con infraestructura robusta y soporte 24/7. Ofrecemos soluciones de alojamiento web confiables para desarrolladores y empresas.',
      url: 'https://flyxnodes.xyz/',
      icon: <Server className="w-6 h-6" />,
      category: 'featured',
      tags: ['Hosting', 'Web Services', 'Infrastructure'],
      status: 'active',
      year: '2025'
    },
    {
      id: 'distopycraft',
      title: 'DistopyCraft',
      description: 'Servidor de Minecraft con experiencia única y comunidad activa. Incluye modos de juego personalizados, eventos especiales y un sistema de economía balanceado.',
      url: 'https://distopycraft.com/',
      icon: <Gamepad2 className="w-6 h-6" />,
      category: 'featured',
      tags: ['Gaming', 'Minecraft', 'Community'],
      status: 'active',
      year: '2024'
    },
    {
      id: 'apostolic-videos',
      title: 'Contenido Audiovisual - Asamblea Apostólica',
      description: 'Producción y edición de contenido audiovisual para la Asamblea Apostólica del Paraguay. Videos testimoniales y contenido de alta calidad.',
      url: 'https://www.youtube.com/playlist?list=PLLpF7QHeJQKt_tGHE5e-MHBzmr4ewce2R',
      icon: <Video className="w-6 h-6" />,
      category: 'other',
      tags: ['Video Production', 'Religious Content', 'YouTube'],
      status: 'ongoing',
      year: '2024-2025'
    },
    {
      id: 'discord-bot',
      title: 'Discord.JS v14 Bot Base',
      description: 'Template base para bots de Discord desarrollado con Discord.JS v14. Incluye comandos básicos, sistema de eventos y estructura modular para facilitar el desarrollo.',
      githubUrl: 'https://github.com/AjnebAlReves/discordjs-basicbot',
      icon: <Bot className="w-6 h-6" />,
      category: 'other',
      tags: ['Discord', 'JavaScript', 'Bot Development'],
      status: 'completed',
      year: '2023-2025'
    },
    {
      id: 'churchtils',
      title: 'ChurchTils',
      description: 'Software de gestión integral para iglesias. Incluye administración de miembros, eventos, finanzas y comunicación. Desarrollado para simplificar la gestión eclesiástica.',
      githubUrl: 'https://github.com/ByAlReves-Studio/churchtils',
      icon: <Church className="w-6 h-6" />,
      category: 'other',
      tags: ['Church Management', 'Web App', 'Database'],
      status: 'ongoing',
      year: '2025'
    }
  ];

  const filteredProjects = projects.filter(project => 
    selectedCategory === 'all' || project.category === selectedCategory
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return isDark ? 'text-green-400 bg-green-400/10' : 'text-green-600 bg-green-100';
      case 'ongoing':
        return isDark ? 'text-yellow-400 bg-yellow-400/10' : 'text-yellow-600 bg-yellow-100';
      case 'completed':
        return isDark ? 'text-blue-400 bg-blue-400/10' : 'text-blue-600 bg-blue-100';
      default:
        return isDark ? 'text-gray-400 bg-gray-400/10' : 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Activo';
      case 'ongoing':
        return 'En progreso';
      case 'completed':
        return 'Completado';
      default:
        return status;
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900'
    }`}>
      
      {/* Header */}
      <header className="relative px-6 py-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Navigation */}
          <nav className="flex items-center justify-between mb-12">
            <Link
              to="/"
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 ${
                isDark 
                  ? 'bg-white/10 border border-white/20 hover:bg-white/20' 
                  : 'bg-gray-900/10 border border-gray-900/20 hover:bg-gray-900/20'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Volver</span>
            </Link>

            <button
              onClick={toggleTheme}
              className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                isDark 
                  ? 'bg-white/10 border border-white/20 hover:bg-white/20' 
                  : 'bg-gray-900/10 border border-gray-900/20 hover:bg-gray-900/20'
              }`}
              aria-label="Cambiar tema"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </nav>

          {/* Title Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Code className={`w-8 h-8 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
                Portfolio
              </h1>
            </div>
            <p className={`text-lg max-w-2xl mx-auto leading-relaxed ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Una colección de mis proyectos más destacados, desde servicios de hosting hasta desarrollo de software y contenido audiovisual.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {[
              { key: 'all', label: 'Todos los Proyectos', count: projects.length },
              { key: 'featured', label: 'Destacados', count: projects.filter(p => p.category === 'featured').length },
              { key: 'other', label: 'Otros Proyectos', count: projects.filter(p => p.category === 'other').length }
            ].map(({ key, label, count }) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key as any)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                  selectedCategory === key
                    ? isDark
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                    : isDark
                      ? 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10'
                      : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {label}
                <span className={`text-xs px-2 py-1 rounded-full ${
                  selectedCategory === key
                    ? isDark ? 'bg-emerald-400/20' : 'bg-emerald-200'
                    : isDark ? 'bg-white/10' : 'bg-gray-200'
                }`}>
                  {count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Projects Grid */}
      <main className="px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <article
                key={project.id}
                className={`group relative rounded-2xl transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl ${
                  isDark 
                    ? 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20' 
                    : 'bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 shadow-lg'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                
                {/* Featured Badge */}
                {project.category === 'featured' && (
                  <div className={`absolute -top-3 -right-3 p-2 rounded-full ${
                    isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600'
                  }`}>
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                )}

                <div className="p-6">
                  
                  {/* Project Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl ${
                      isDark ? 'bg-white/10' : 'bg-gray-100'
                    } group-hover:scale-110 transition-transform duration-300`}>
                      {project.icon}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 opacity-60" />
                      <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {project.year}
                      </span>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-500 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className={`text-sm leading-relaxed ${
                      isDark ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {project.description}
                    </p>
                  </div>

                  {/* Status Badge */}
                  <div className="mb-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      {getStatusText(project.status)}
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className={`px-2 py-1 text-xs rounded-lg ${
                          isDark 
                            ? 'bg-white/5 text-gray-400 border border-white/10' 
                            : 'bg-gray-100 text-gray-600 border border-gray-200'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                          isDark
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30'
                            : 'bg-emerald-100 text-emerald-700 border border-emerald-200 hover:bg-emerald-200'
                        }`}
                      >
                        <Globe className="w-4 h-4" />
                        <span className="text-sm">Ver Proyecto</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${project.url ? 'px-3' : 'flex-1 justify-center'} flex items-center gap-2 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                          isDark
                            ? 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                            : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                        }`}
                      >
                        <Github className="w-4 h-4" />
                        {!project.url && <span className="text-sm">Ver Código</span>}
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                isDark ? 'bg-white/10' : 'bg-gray-100'
              }`}>
                <Code className="w-8 h-8 opacity-50" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No hay proyectos</h3>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                No se encontraron proyectos en esta categoría.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            &copy; 2025 AjnebAlRevés · Portfolio de Proyectos
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;