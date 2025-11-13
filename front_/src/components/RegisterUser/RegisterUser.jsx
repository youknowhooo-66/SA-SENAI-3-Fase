import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const RegisterUser = ({ onClose }) => { // Adicionado onClose para fechar o modal
  // campos do formulário
  const [name, setName] = useState(''); // Adicionado campo de nome
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // verificador de correspondencia de senha
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // funções de alteração de estado
  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setIsPasswordMatch(password === e.target.value);
  };

  //validação dos campos de senha
  const isPasswordValid = () => password.length >= 8 && password === confirmPassword;

  //função para limpar o formulário
  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setIsPasswordMatch(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isPasswordValid()) {
      setIsPasswordMatch(false);
      toast.error('As senhas não correspondem ou são muito curtas.');
      return;
    }

    setIsSaving(true);
    try {
      // Usa a instância 'api' e o endpoint correto
      await axios.post('http://localhost:3000/auth/register', { name, email, password });
      setIsSaving(false);
      resetForm();
      toast.success("Usuário criado com sucesso! Agora você pode fazer login.", {
        autoClose: 4000,
        hideProgressBar: true,
        pauseOnHover: false
      });
      if (onClose) onClose(); // Fecha o modal se a função for passada

    } catch (error) {
      setIsSaving(false);
      console.error("Erro ao criar o usuário!", error);
      const errorMessage = error.response?.data?.error || 'Erro ao criar usuário!';
      toast.error(errorMessage, {
        autoClose: 3000,
        hideProgressBar: true,
        pauseOnHover: false
      });
    }
  };

  return (
    <div className='w-full max-w-md p-6 bg-white rounded-xl shadow-lg'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Criar Conta</h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
            {/* campo nome */}
            <div>
                <label htmlFor="nameRegisterUser" className='block text-sm font-medium mb-1'>Nome</label>
                <input type="text" 
                id='nameRegisterUser' 
                value={name}
                onChange={handleNameChange}
                required 
                className='w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' />
            </div>

            {/* registrar email */}
            <div>
                <label htmlFor="emailRegisterUser" className='block text-sm font-medium mb-1'>Email</label>
                <input type="email" 
                id='emailRegisterUser' 
                value={email}
                onChange={handleEmailChange}
                required 
                className='w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' />
            </div>

            <div>
                <label htmlFor="passwordRegisterUser" className='block text-sm font-medium mb-1'>Senha (mín. 8 caracteres)</label>
                <input 
                type="password" 
                id='passwordRegisterUser' 
                value={password}
                onChange={handlePasswordChange}
                required
                minLength={8}
                className='w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' />
            </div>

            <div>
                <label htmlFor="confirmPassword" className='block text-sm font-medium mb-1'>Confirmar Senha</label>
                <input 
                type="password" 
                id='confirmPassword' 
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
                minLength={8}
                className='w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' />
                {!isPasswordMatch && (
                  <p className='text-red-500 text-sm mt-1'>As senhas não correspondem!</p>
                )}
            </div>
            <div>
              <button
                type='submit'
                disabled={isSaving || !isPasswordValid() || !name || !email}
                className={`w-full p-2 rounded-lg text-white ${isSaving || !isPasswordValid() || !name || !email ? 'bg-gray-400 cursor-not-allowed' : 'bg-cyan-700 hover:bg-cyan-800'} transition-colors cursor-pointer`}
              >
                  {isSaving ? 'Salvando...' : 'Criar Conta'}
              </button>
            </div>
        </form>
    </div>
  );
};

export default RegisterUser;