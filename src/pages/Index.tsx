
import { useState } from 'react';
import Login from '@/components/Login';
import Dashboard from '@/components/Dashboard';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (email: string, password: string) => {
    console.log('Login attempt:', { email, password });
    
    // Simulação de autenticação - Em produção, isso será feito via Supabase
    if (email && password) {
      // Simula delay da API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsLoggedIn(true);
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo ao Visualizador de Leads.",
      });
    } else {
      throw new Error('Credenciais inválidas');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return <Dashboard onLogout={handleLogout} />;
};

export default Index;
