
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MessageCircle, Mail, Phone, Save, User, Calendar, FileText, Target } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

interface LeadDetailProps {
  lead: Lead;
  onBack: () => void;
  onUpdate: (lead: Lead) => void;
}

const LeadDetail = ({ lead, onBack, onUpdate }: LeadDetailProps) => {
  const [editedLead, setEditedLead] = useState<Lead>(lead);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    setLoading(true);
    try {
      // Aqui seria feita a atualização no Supabase
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simula API call
      
      onUpdate(editedLead);
      toast({
        title: "Lead atualizado",
        description: "As informações foram salvas com sucesso!",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível salvar as alterações.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsApp = () => {
    if (editedLead.telefone) {
      const cleanPhone = editedLead.telefone.replace(/\D/g, '');
      const url = `https://web.whatsapp.com/send?phone=55${cleanPhone}&text=Olá ${editedLead.nome_completo}, tudo bem?`;
      window.open(url, '_blank');
    } else {
      toast({
        title: "Telefone não encontrado",
        description: "Este lead não possui um número de telefone cadastrado.",
        variant: "destructive"
      });
    }
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(`Contato - ${editedLead.nome_completo}`);
    const body = encodeURIComponent(`Olá ${editedLead.nome_completo},\n\nEspero que esteja bem!\n\n`);
    const url = `mailto:${editedLead.email}?subject=${subject}&body=${body}`;
    window.open(url, '_blank');
  };

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

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Não informado';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-primary-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                onClick={onBack}
                variant="ghost"
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Voltar
              </Button>
              
              <div className="h-6 w-px bg-gray-300" />
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center">
                  <span className="text-primary-700 font-semibold text-lg">
                    {editedLead.nome_completo.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">{editedLead.nome_completo}</h1>
                  <p className="text-sm text-gray-600">{editedLead.email}</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {editedLead.status && (
                <Badge className={`${getStatusColor(editedLead.status)} border`}>
                  {editedLead.status}
                </Badge>
              )}
              
              <Button
                onClick={handleSave}
                className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Salvando...</span>
                  </div>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Salvar
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Action Buttons */}
          <div className="lg:col-span-3">
            <Card className="gradient-card border-0 shadow-lg animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center text-lg font-semibold text-gray-900">
                  <MessageCircle className="w-5 h-5 mr-2 text-primary-600" />
                  Ações Rápidas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Button
                    onClick={handleWhatsApp}
                    className="bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chamar no WhatsApp
                  </Button>
                  
                  <Button
                    onClick={handleEmail}
                    className="bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Enviar Email
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lead Information */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Basic Info */}
            <Card className="gradient-card border-0 shadow-lg animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center text-lg font-semibold text-gray-900">
                  <User className="w-5 h-5 mr-2 text-primary-600" />
                  Informações Básicas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nome">Nome Completo</Label>
                    <Input
                      id="nome"
                      value={editedLead.nome_completo}
                      onChange={(e) => setEditedLead({...editedLead, nome_completo: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={editedLead.email}
                      onChange={(e) => setEditedLead({...editedLead, email: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input
                      id="telefone"
                      value={editedLead.telefone || ''}
                      onChange={(e) => setEditedLead({...editedLead, telefone: e.target.value})}
                      placeholder="(11) 99999-9999"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="status">Status do Lead</Label>
                    <Select
                      value={editedLead.status || ''}
                      onValueChange={(value) => setEditedLead({...editedLead, status: value})}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Novo">Novo</SelectItem>
                        <SelectItem value="Em Contato">Em Contato</SelectItem>
                        <SelectItem value="Convertido">Convertido</SelectItem>
                        <SelectItem value="Perdido">Perdido</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <Card className="gradient-card border-0 shadow-lg animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center text-lg font-semibold text-gray-900">
                  <FileText className="w-5 h-5 mr-2 text-primary-600" />
                  Informações Adicionais
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="observacoes">Observações</Label>
                  <Textarea
                    id="observacoes"
                    value={editedLead.observacoes || ''}
                    onChange={(e) => setEditedLead({...editedLead, observacoes: e.target.value})}
                    placeholder="Adicione observações sobre este lead..."
                    className="mt-1 min-h-[100px]"
                  />
                </div>
                
                <div>
                  <Label htmlFor="proximo_passo">Próximo Passo</Label>
                  <Textarea
                    id="proximo_passo"
                    value={editedLead.proximo_passo || ''}
                    onChange={(e) => setEditedLead({...editedLead, proximo_passo: e.target.value})}
                    placeholder="Defina o próximo passo para este lead..."
                    className="mt-1 min-h-[80px]"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            
            {/* Timeline */}
            <Card className="gradient-card border-0 shadow-lg animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center text-lg font-semibold text-gray-900">
                  <Calendar className="w-5 h-5 mr-2 text-primary-600" />
                  Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Lead Criado</p>
                      <p className="text-xs text-gray-600">{formatDate(editedLead.created_at)}</p>
                    </div>
                  </div>
                  
                  {editedLead.status && editedLead.status !== 'Novo' && (
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Status: {editedLead.status}</p>
                        <p className="text-xs text-gray-600">Atualizado recentemente</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="gradient-card border-0 shadow-lg animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center text-lg font-semibold text-gray-900">
                  <Target className="w-5 h-5 mr-2 text-primary-600" />
                  Informações Rápidas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Email válido:</span>
                    <Badge className="bg-green-100 text-green-800 border-green-200 border">
                      ✓ Sim
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Telefone:</span>
                    <Badge className={editedLead.telefone ? "bg-green-100 text-green-800 border-green-200 border" : "bg-red-100 text-red-800 border-red-200 border"}>
                      {editedLead.telefone ? "✓ Sim" : "✗ Não"}
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Status:</span>
                    <Badge className={editedLead.status ? getStatusColor(editedLead.status) + " border" : "bg-gray-100 text-gray-800 border-gray-200 border"}>
                      {editedLead.status || 'Não definido'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadDetail;
