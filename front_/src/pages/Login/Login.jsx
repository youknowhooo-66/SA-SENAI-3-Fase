import LoginForm from '../../components/Loginform/Loginform';
import { IconTicket } from '../../components/Icons';

export default function Login() {
    return (
        <div className='flex min-h-screen bg-gray-100 dark:bg-gray-900'>
            {/* Left side - Branding */}
            <div className='hidden md:flex w-1/2 bg-gradient-to-br from-cyan-600 to-blue-700 flex-col items-center justify-center p-12 text-white text-center'>
                <IconTicket size={80} className="mb-6" />
                <h1 className="text-4xl font-bold mb-4">Sistema de Agendamento</h1>
                <p className="text-lg text-cyan-100">Gerencie seus horários de forma fácil e eficiente.</p>
            </div>
            {/* Right side - Form */}
            <div className='flex w-full md:w-1/2 items-center justify-center p-8'>
                <LoginForm />
            </div>
        </div>
    )
}