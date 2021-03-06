import { REPRESENTATIVE_MODAL } from '../constants';
import DatabaseWrapper from '../models';

class RepresentativeActions {
	static async getAllRepresentatives(req, res) {
		const representatives = await DatabaseWrapper.findAll(
			REPRESENTATIVE_MODAL, {}
		);
		return res.status(200).json({ records: representatives });
	}

	static async getRepresentative(req, res) {
		const { id: userId } = req.params;

		const representative = await DatabaseWrapper.findOne(REPRESENTATIVE_MODAL, userId);

		return res.status(200).json({ record: representative });
	}

	static async createRepresentative(req, res) {
		const data = req.body;
		try {
			const representative = await DatabaseWrapper.createOne(REPRESENTATIVE_MODAL, data);
			return res.status(201).json({ record: representative });
		} catch (err) {
			if (err.name === 'SequelizeForeignKeyConstraintError') {
				return res.status(400).json({ message: `Could not find the ${err.table} selected` });
			}
			if (err.name === 'SequelizeUniqueConstraintError') {
				return res.status(400).json({
					message: `This phone number has already been used ${data.contact}`
				});
			}
			return res.status(400).json({ message: err.message });
		}
	}

	static async updateRepresentative(req, res) {
		const { id: userId } = req.params;
		const update = req.body;

		try {
			const representative = await DatabaseWrapper.updateOne(
				REPRESENTATIVE_MODAL, { id: userId }, update
			);

			return res.status(202).json({ record: representative });
		} catch (err) {
			return res.status(400).json({ message: err.message });
		}
	}

	static async deleteRepresentative(req, res) {
		const { id: userId } = req.params;

		const data = await DatabaseWrapper.deleteOne(REPRESENTATIVE_MODAL, { id: userId });

		if (data) return res.status(204).json({ message: data });

		return res.status(400).json({ message: 'Could not delete the requested record' });
	}
}

export default RepresentativeActions;
