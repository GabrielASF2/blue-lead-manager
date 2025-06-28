
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { X } from 'lucide-react';

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

interface LeadFormProps {
  onClose: () => void;
  onLeadCreated: (lead: Lead) => void;
}

const LeadForm = ({ onClose, onLeadCreated }: LeadFormProps) => {
  const [formData, setFormData] = useState({
    nome_completo: '',
    email: '',
    telefone: '',
    status: 'Novo',
    observacoes: '',
    proximo_passo: ''
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('leads')
        .insert([formData])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Lead criado com sucesso!",
        description: `${formData.nome_completo} foi adicionado aos leads.`,
      });

      onLeadCreated(data);
      onClose();
    } catch (error) {
      console.error('Erro ao criar lead:', error);
      toast({
        title: "Erro ao criar lead",
        description: "Ocorreu um erro ao salvar o lead. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Criar Novo Lead</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="nome_completo">Nome Completo *</Label>
              <Input
                id="nome_completo"
                type="text"
                value={formData.nome_completo}
                onChange={(e) => handleChange('nome_completo', e.target.value)}
                placeholder="Digite o nome completo"
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="Digite o email"
                required
              />
            </div>

            <div>
              <Label htmlFor="telefone">Telefone</Label>
              <Input
                id="telefone"
                type="tel"
                value={formData.telefone}
                onChange={(e) => handleChange('telefone', e.target.value)}
                placeholder="Digite o telefone"
              />
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Novo">Novo</SelectItem>
                  <SelectItem value="Em Contato">Em Contato</SelectItem>
                  <SelectItem value="Convertido">Convertido</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="observacoes">Observações</Label>
              <Textarea
                id="observacoes"
                value={formData.observacoes}
                onChange={(e) => handleChange('observacoes', e.target.value)}
                placeholder="Digite observações sobre o lead"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="proximo_passo">Próximo Passo</Label>
              <Textarea
                id="proximo_passo"
                value={formData.proximo_passo}
                onChange={(e) => handleChange('proximo_passo', e.target.value)}
                placeholder="Digite o próximo passo a ser realizado"
                rows={2}
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Salvando...' : 'Criar Lead'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadForm;
