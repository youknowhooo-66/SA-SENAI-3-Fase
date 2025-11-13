import prisma from '../../config/prismaClient.js';

class ServiceController {
    
    // CREATE
    async create(req, res) {
        const { name, price, durationMin } = req.body;
        
        // Validação básica
        if (!name || price === undefined || durationMin === undefined) {
             return res.status(400).json({ error: 'Nome, preço e duração (em minutos) são obrigatórios.' });
        }

        try {
            const newService = await prisma.service.create({
                data: {
                    name,
                    price: parseFloat(price),
                    durationMin: parseInt(durationMin),
                },
            });
            return res.status(201).json(newService);
        } catch (error) {
            if (error.code === 'P2002') {
                return res.status(409).json({ error: 'Um serviço com este nome já existe.' });
            }
            console.error('Erro ao criar serviço:', error);
            return res.status(500).json({ error: 'Erro interno do servidor ao criar serviço.' });
        }
    }

    // READ (Listar todos)
    async getAll(req, res) {
        try {
            const services = await prisma.service.findMany();
            return res.status(200).json(services);
        } catch (error) {
            console.error('Erro ao listar serviços:', error);
            return res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    }

    // READ (Buscar por ID)
    async getById(req, res) {
        const { id } = req.params;
        try {
            const service = await prisma.service.findUnique({
                where: { id: parseInt(id) },
            });
            if (!service) {
                return res.status(404).json({ error: 'Serviço não encontrado.' });
            }
            return res.status(200).json(service);
        } catch (error) {
             console.error('Erro ao buscar serviço:', error);
            return res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    }

    // UPDATE
    async update(req, res) {
        const { id } = req.params;
        const { name, price, durationMin } = req.body;
        
        try {
            const updatedService = await prisma.service.update({
                where: { id: parseInt(id) },
                data: {
                    name,
                    price: price !== undefined ? parseFloat(price) : undefined,
                    durationMin: durationMin !== undefined ? parseInt(durationMin) : undefined,
                },
            });
            return res.status(200).json(updatedService);
        } catch (error) {
            if (error.code === 'P2025') {
                 return res.status(404).json({ error: 'Serviço não encontrado para atualizar.' });
            }
            if (error.code === 'P2002') {
                return res.status(409).json({ error: 'Um serviço com este nome já existe.' });
            }
            console.error('Erro ao atualizar serviço:', error);
            return res.status(500).json({ error: 'Erro interno do servidor ao atualizar serviço.' });
        }
    }

    // DELETE
    async delete(req, res) {
        const { id } = req.params;
        try {
            await prisma.service.delete({
                where: { id: parseInt(id) },
            });
            return res.status(204).send();
        } catch (error) {
            if (error.code === 'P2025') {
                return res.status(404).json({ error: 'Serviço não encontrado para exclusão.' });
            }
            // P2003: Foreign key constraint failed (se houver agendamentos associados)
            if (error.code === 'P2003') {
                return res.status(409).json({ error: 'Não é possível excluir o serviço, pois existem agendamentos associados.' });
            }
            console.error('Erro ao deletar serviço:', error);
            return res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    }
}

export const serviceController = new ServiceController();