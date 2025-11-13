import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IconCircleCheck, IconAlertTriangle, IconLoader } from '../../components/Icons';

const Cancellation = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('idle'); // idle, confirming, confirmed, error

    const handleConfirmCancellation = () => {
        setStatus('confirming');
        // Simulate API call
        setTimeout(() => {
            // Simulate a successful cancellation
            if (token) {
                console.log(`Cancelling appointment with token: ${token}`);
                setStatus('confirmed');
                // Redirect to a confirmation/home page after a delay
                setTimeout(() => navigate('/'), 3000);
            } else {
                setStatus('error');
            }
        }, 2000);
    };

    const renderContent = () => {
        switch (status) {
            case 'confirmed':
                return (
                    <div className="text-center text-green-500 animate-fade-in">
                        <IconCircleCheck size={64} className="mx-auto mb-4" />
                        <h2 className="text-3xl font-bold">Agendamento Cancelado!</h2>
                        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Sua vaga foi liberada. Redirecionando...</p>
                    </div>
                );
            case 'error':
                return (
                    <div className="text-center text-red-500 animate-fade-in">
                        <IconAlertTriangle size={64} className="mx-auto mb-4" />
                        <h2 className="text-3xl font-bold">Erro no Cancelamento</h2>
                        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Não foi possível processar o cancelamento. O link pode ser inválido.</p>
                    </div>
                );
            case 'confirming':
                return (
                    <div className="text-center">
                        <IconLoader size={64} className="mx-auto mb-4 animate-spin text-cyan-500" />
                        <h2 className="text-3xl font-bold">Cancelando...</h2>
                        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Aguarde enquanto processamos sua solicitação.</p>
                    </div>
                );
            case 'idle':
            default:
                return (
                    <div className="text-center animate-fade-in">
                        <IconAlertTriangle size={64} className="mx-auto mb-4 text-yellow-500" />
                        <h2 className="text-3xl font-bold">Confirmar Cancelamento</h2>
                        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Você tem certeza que deseja cancelar seu agendamento?</p>
                        <div className="mt-8 flex justify-center gap-4">
                            <button
                                onClick={() => navigate('/')}
                                className="px-8 py-3 font-semibold rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                            >
                                Não, voltar
                            </button>
                            <button
                                onClick={handleConfirmCancellation}
                                className="px-8 py-3 font-semibold rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                            >
                                Sim, cancelar
                            </button>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 flex items-center justify-center p-4">
            <div className="max-w-lg w-full bg-white dark:bg-gray-800 p-10 rounded-xl shadow-lg">
                {renderContent()}
            </div>
        </div>
    );
};

export default Cancellation;
