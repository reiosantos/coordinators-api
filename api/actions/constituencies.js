import { CONSTITUENCY_MODAL } from '../constants';
import DatabaseWrapper from '../models';

class ConstituencyActions {
	static async getAllConstituencies(req, res) {
		const constituencies = await DatabaseWrapper.findAll(CONSTITUENCY_MODAL, {});
		return res.status(200).json({ records: constituencies });
	}

	static async getConstituency(req, res) {
		const { id: constituencyId } = req.params;

		const constituency = await DatabaseWrapper.findOne(CONSTITUENCY_MODAL, constituencyId);

		return res.status(200).json({ record: constituency });
	}

	static async createConstituency(req, res) {
		const data = req.body;

		try {
			const constituency = await DatabaseWrapper.createOne(CONSTITUENCY_MODAL, data);
			return res.status(201).json({ record: constituency });
		} catch (err) {
			if (err.name === 'SequelizeForeignKeyConstraintError') {
				return res.status(400).json({
					message: `Could not find the ${err.table} selected`
				});
			}
			return res.status(400).json({ message: err.errors[0].message });
		}
	}

	static async updateConstituency(req, res) {
		const { id: constituencyId } = req.params;
		const update = req.body;
		if (!update.representativeId || update.representativeId === 'null') {
			update.representativeId = null;
		}

		try {
			const constituency = await DatabaseWrapper.updateOne(
				CONSTITUENCY_MODAL, { id: constituencyId }, update
			);

			return res.status(202).json({ record: constituency });
		} catch (err) {
			return res.status(400).json({ message: err.message });
		}
	}

	static async deleteConstituency(req, res) {
		const { id: constituencyId } = req.params;

		const data = await DatabaseWrapper.deleteOne(CONSTITUENCY_MODAL, { id: constituencyId });

		if (data) return res.status(204).json({ message: data });

		return res.status(400).json({ message: 'Could not delete the requested record' });
	}
}

export default ConstituencyActions;
