import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";
import RegisterUser from "../RegisterUser/RegisterUser";
import axios from "axios";
import Input from "../Form/Input";
import Button from "../Form/Button";
import { IconMail, IconLock } from "../Icons";


const LoginForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    //contexto
    const { login, user } = useAuth()
    // rotas com react router
    const navigate = useNavigate()
    // modal
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        if (user) {
            navigate('/dashboard')
        }
    }, [user, navigate])

    // função validação do login
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const data = {
                email: email,
                password: password
            };
            const response = await axios.post("http://localhost:3000/auth/login", data);

            // O backend retorna 'accessToken', não 'token'
            if (response.data.accessToken) {
                // A função 'login' do AuthContext espera o token
                login(response.data.accessToken); 
                
                toast.success("Login realizado com sucesso!", {
                    autoClose: 3000,
                    hideProgressBar: true,
                    pauseOnHover: false
                });

                setTimeout(() => navigate('/dashboard'), 2000);
            } else {
                // Caso a resposta não contenha o accessToken por algum motivo
                toast.error('Token de acesso não recebido.', {
                    autoClose: 3000,
                    hideProgressBar: true,
                    pauseOnHover: false
                });
            }

        } catch (error) {
            console.error('Erro no login:', error);
            // Pega a mensagem de erro específica do backend, se disponível
            const errorMessage = error.response?.data?.error || 'Erro ao conectar com o servidor';
            toast.error(errorMessage, {
                autoClose: 3000,
                hideProgressBar: true,
                pauseOnHover: false
            });
        }
    }

    return (
        <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl">

            <h2 className="text-3xl font-bold text-center mb-2 text-gray-800 dark:text-white">Bem-vindo!</h2>
            <p className="text-center text-gray-500 dark:text-gray-400 mb-8">Faça login para continuar</p>

            <form onSubmit={handleLogin} className="space-y-6">
                <Input 
                    icon={<IconMail />}
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <Input 
                    icon={<IconLock />}
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                
                <Button type="submit" fullWidth>
                    Entrar
                </Button>
            </form>
            <div className="flex justify-between mt-6 text-sm">
                <button className="cursor-pointer text-gray-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition">Esqueceu sua senha?</button>
                <button className="cursor-pointer font-semibold text-cyan-600 dark:text-cyan-400 hover:underline" onClick={() => setIsModalOpen(true)}>Criar conta</button>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <RegisterUser onClose={() => setIsModalOpen(false)} />
            </Modal>
        </div>

    )
}

export default LoginForm