
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Users, Search, Plus, Filter, LogOut, Eye } from 'lucide-react';
import LeadDetail from './LeadDetail';

interface Lead {
  id: string;
  nome_completo: string;
  email: string;
  telefone?: string;
  status?: string;
  observacoes?: string;
  proximo_passo?: string;
  created_at?: string;
}

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock data para demonstração
  useEffect(() => {
    // Simulando carregamento de dados do Supabase
    const mockLeads: Lead[] = [
      {
        id: '1',
        nome_completo: 'João Silva Santos',
        email: 'joao.silva@email.com',
        telefone: '11999887766',
        status: 'Novo',
        created_at: '2024-01-15'
      },
      {
        id: '2',
        nome_completo: 'Maria Oliveira Costa',
        email: 'maria.oliveira@email.com',
        telefone: '11888776655',
        status: 'Em Contato',
        observacoes: 'Interessada em nossos serviços premium',
        created_at: '2024-01-14'
      },
      {
        id: '3',
        nome_completo: 'Pedro Rodrigues Lima',
        email: 'pedro.lima@email.com',
        telefone: '11777665544',
        status: 'Convertido',
        proximo_passo: 'Agendar reunião de onboarding',
        created_at: '2024-01-13'
      },
      {
        id: '4',
        nome_completo: 'Ana Carolina Ferreira',
        email: 'ana.ferreira@email.com',
        telefone: '11666554433',
        status: 'Novo',
        created_at: '2024-01-12'
      },
      {
        id: '5',
        nome_completo: 'Carlos Eduardo Souza',
        email: 'carlos.souza@email.com',
        telefone: '11555443322',
        status: 'Em Contato',
        observacoes: 'Precisa de mais informações sobre preços',
        created_at: '2024-01-11'
      }
    ];

    setTimeout(() => {
      setLeads(mockLeads);
      setFilteredLeads(mockLeads);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const filtered = leads.filter(lead =>
      lead.nome_completo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLeads(filtered);
  }, [searchTerm, leads]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Novo':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Em Contato':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Convertido':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleLeadUpdate = (updatedLead: Lead) => {
    setLeads(prevLeads =>
      prevLeads.map(lead =>
        lead.id === updatedLead.id ? updatedLead : lead
      )
    );
    setSelectedLead(updatedLead);
  };

  if (selectedLead) {
    return (
      <LeadDetail
        lead={selectedLead}
        onBack={() => setSelectedLead(null)}
        onUpdate={handleLeadUpdate}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-primary-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Visualizador de Leads</h1>
                <p className="text-sm text-gray-600">Gerencie seus leads de forma eficiente</p>
              </div>
            </div>
            
            <Button
              onClick={onLogout}
              variant="outline"
              className="text-gray-600 hover:text-gray-900 border-gray-200 hover:bg-gray-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="gradient-card border-0 shadow-lg hover:shadow-xl transition-all duration-200 animate-fade-in">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total de Leads</p>
                  <p className="text-3xl font-bold text-gray-900">{leads.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-0 shadow-lg hover:shadow-xl transition-all duration-200 animate-fade-in">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Novos Leads</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {leads.filter(lead => lead.status === 'Novo').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Plus className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-0 shadow-lg hover:shadow-xl transition-all duration-200 animate-fade-in">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Convertidos</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {leads.filter(lead => lead.status === 'Convertido').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Filter className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="gradient-card border-0 shadow-lg mb-8 animate-slide-up">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Buscar Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Buscar por nome ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 border-gray-200 focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
          </CardContent>
        </Card>

        {/* Leads List */}
        <Card className="gradient-card border-0 shadow-lg animate-slide-up">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Lista de Leads ({filteredLeads.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
              </div>
            ) : filteredLeads.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Nenhum lead encontrado</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredLeads.map((lead, index) => (
                  <div
                    key={lead.id}
                    className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100 hover:border-primary-200 hover:shadow-md transition-all duration-200 cursor-pointer group"
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => setSelectedLead(lead)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center">
                        <span className="text-primary-700 font-semibold text-lg">
                          {lead.nome_completo.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 group-hover:text-primary-700 transition-colors">
                          {lead.nome_completo}
                        </h3>
                        <p className="text-sm text-gray-600">{lead.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      {lead.status && (
                        <Badge className={`${getStatusColor(lead.status)} border`}>
                          {lead.status}
                        </Badge>
                      )}
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
