import React, { useState, useEffect } from 'react';
import BookingForm from '../../components/BookingForm/BookingForm';
import ServiceCard from '../../components/ServiceCard/ServiceCard';
import { IconCircleCheck, IconCalendarX } from '../../components/Icons';
import mockServices from '../../data/mockServices';
import { toast } from 'react-toastify';
import Button from '../../components/Form/Button'; // Added Button import

const daysOfWeekMap = {
    'monday': 'Segunda-feira',
    'tuesday': 'Terça-feira',
    'wednesday': 'Quarta-feira',
    'thursday': 'Quinta-feira',
    'friday': 'Sexta-feira',
    'saturday': 'Sábado',
    'sunday': 'Domingo',
};

const Scheduling = () => {
    const [selectedService, setSelectedService] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [isBookingConfirmed, setBookingConfirmed] = useState(false);
    const [services, setServices] = useState(mockServices); // Use mock data for now

    // Function to update slot availability in mock data
    const updateSlotAvailability = (serviceId, day, time) => {
        setServices(prevServices => 
            prevServices.map(service => {
                if (service.id === serviceId) {
                    return {
                        ...service,
                        schedule: service.schedule.map(sDay => {
                            if (sDay.day === day) {
                                return {
                                    ...sDay,
                                    slots: sDay.slots.map(slot => {
                                        if (slot.time === time && slot.available > 0) {
                                            return { ...slot, available: slot.available - 1 };
                                        }
                                        return slot;
                                    })
                                };
                            }
                            return sDay;
                        })
                    };
                }
                return service;
            })
        );
    };

    const handleBookingConfirm = (bookingDetails) => {
        console.log('Booking Confirmed:', bookingDetails);
        
        // Update mock data
        updateSlotAvailability(
            selectedService.id, 
            bookingDetails.slot.day, 
            bookingDetails.slot.time
        );

        // Simulate sending email
        const cancellationToken = `${bookingDetails.email}-${Date.now()}`;
        console.log(`--- SIMULATING EMAIL ---`);
        console.log(`To: ${bookingDetails.email}`);
        console.log(`Subject: Seu Agendamento para ${selectedService.title} foi Confirmado!`);
        console.log(`Olá ${bookingDetails.name},`);
        console.log(`Seu agendamento para ${selectedService.title} às ${bookingDetails.slot.time} em ${daysOfWeekMap[bookingDetails.slot.day]} foi confirmado.`);
        console.log(`Para cancelar, acesse: http://localhost:5173/cancel/${cancellationToken}`);
        console.log(`-----------------------`);

        setBookingConfirmed(true);
        setSelectedSlot(null);
        setSelectedService(null); // Go back to service selection after booking
        toast.success('Agendamento confirmado! Verifique seu e-mail para o link de cancelamento.');
    };

    if (isBookingConfirmed) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 flex items-center justify-center p-4">
                <div className="max-w-lg w-full bg-white dark:bg-gray-800 p-10 rounded-xl shadow-lg text-center animate-fade-in">
                    <IconCircleCheck size={64} className="mx-auto mb-4 text-green-500" />
                    <h1 className="text-3xl font-bold">Agendamento Confirmado!</h1>
                    <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                        Uma confirmação e o link para cancelamento foram enviados para o seu e-mail.
                    </p>
                    <Button
                        onClick={() => setBookingConfirmed(false)}
                        className="mt-8"
                    >
                        Agendar outro horário
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-4 sm:p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl sm:text-4xl font-bold text-center text-cyan-600 dark:text-cyan-400 mb-4">Agende seu Horário</h1>
                <p className="text-center text-md sm:text-lg text-gray-600 dark:text-gray-400 mb-8">
                    {selectedService ? `Selecione um horário para ${selectedService.title}` : 'Selecione o serviço desejado para agendar.'}
                </p>

                {!selectedService ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map(service => (
                            <ServiceCard 
                                key={service.id} 
                                service={service} 
                                onSelectService={setSelectedService} 
                            />
                        ))}
                    </div>
                ) : (
                    <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg mb-8">
                        <h2 className="text-2xl font-semibold mb-6 flex items-center justify-between">
                            <span>Horários Disponíveis para {selectedService.title}</span>
                            <Button onClick={() => setSelectedService(null)} className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600">
                                Voltar aos Serviços
                            </Button>
                        </h2>
                        
                        {selectedService.schedule.map(sDay => (
                            <div key={sDay.day} className="mb-6">
                                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-3">{daysOfWeekMap[sDay.day]}</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                    {sDay.slots.map(slot => (
                                        <button 
                                            key={slot.time}
                                            onClick={() => slot.available > 0 && setSelectedSlot({ ...slot, day: sDay.day })}
                                            disabled={slot.available === 0}
                                            className={`p-4 rounded-lg text-center font-semibold transition-all duration-200 disabled:cursor-not-allowed ${
                                                slot.available > 0
                                                ? (selectedSlot?.time === slot.time && selectedSlot?.day === sDay.day ? 'bg-cyan-600 text-white scale-105 shadow-lg' : 'bg-gray-100 dark:bg-gray-700 hover:bg-cyan-100 dark:hover:bg-cyan-900')
                                                : 'bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-500 line-through flex items-center justify-center gap-2'
                                            }`}
                                        >
                                            {slot.available === 0 && <IconCalendarX />}
                                            {slot.time} ({slot.available}/{slot.capacity})
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {selectedSlot && (
                    <BookingForm 
                        selectedSlot={selectedSlot}
                        onBookingConfirm={handleBookingConfirm}
                    />
                )}
            </div>
        </div>
    );
};

export default Scheduling;