import { useSearchParams } from 'react-router';
import { useCallback, useEffect, useState } from 'react';

const KEY_LIMIT = 'limit';

export const useLimit = (optionsValue: number[]) => {
	const [urlParams, setUrlParams] = useSearchParams();

	const param = Number(urlParams.get(KEY_LIMIT) ?? '');
	const acceptableParam = optionsValue.find((value) => value === param);
	const [limit, setLimit] = useState(acceptableParam ?? optionsValue[0]);

	useEffect(() => {
		if (acceptableParam) {
			return;
		}

		setUrlParams(
			(prev) => {
				prev.delete(KEY_LIMIT);

				return prev;
			},
			{ replace: true, preventScrollReset: true },
		);
	}, [acceptableParam, setUrlParams]);

	const handleChangeLimit = useCallback(
		(e: React.ChangeEvent<HTMLSelectElement>) => {
			const value = Number(e.target.value);
			setLimit(value);

			setUrlParams(
				(prev) => {
					if (value === optionsValue[0]) {
						prev.delete(KEY_LIMIT);
					} else {
						prev.set(KEY_LIMIT, String(value));
					}

					return prev;
				},
				{ replace: true, preventScrollReset: true },
			);
		},
		[setUrlParams, optionsValue],
	);

	return { limit, handleChangeLimit };
};
