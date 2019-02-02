import { PARISH_MODAL } from '../constants';
import DatabaseWrapper from '../models';

class ParishActions {
	static async getAllParishes(req, res) {
		const parishes = await DatabaseWrapper.findAll(PARISH_MODAL, {});
		return res.status(200).json({ records: parishes });
	}

	static async getParish(req, res) {
		const { id: parishId } = req.params;

		const parish = await DatabaseWrapper.findOne(PARISH_MODAL, parishId);

		return res.status(200).json({ record: parish });
	}

	static async createParish(req, res) {
		const data = req.body;

		try {
			const parish = await DatabaseWrapper.createOne(PARISH_MODAL, data);
			return res.status(201).json({ record: parish });
		} catch (err) {
			if (err.name === 'SequelizeForeignKeyConstraintError') {
				return res.status(400).json({ message: `Could not find the ${err.table} selected` });
			}
			return res.status(400).json({ message: err.errors[0].message });
		}
	}

	static async updateParish(req, res) {
		const { id: parishId } = req.params;
		const update = req.body;
		if (!update.representativeId || update.representativeId === 'null') {
			update.representativeId = null;
		}
		
		try {
			const parish = await DatabaseWrapper.updateOne(
				PARISH_MODAL, { id: parishId }, update
			);

			return res.status(202).json({ record: parish });
		} catch (err) {
			return res.status(400).json({ message: err.message });
		}
	}

	static async deleteParish(req, res) {
		const { id: parishId } = req.params;

		const data = await DatabaseWrapper.deleteOne(PARISH_MODAL, { id: parishId });

		if (data) return res.status(204).json({ message: data });

		return res.status(400).json({ message: 'Could not delete the requested record' });
	}
}

export default ParishActions;
