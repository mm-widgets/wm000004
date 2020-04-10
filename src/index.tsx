import React, { useEffect, useState } from 'react';
import DateTimePicker, { DateTimePickerProps } from 'react-native-modal-datetime-picker';

export interface IProps extends Omit<DateTimePickerProps, 'onCancel'> {
	minuteInterval?: 1 | 2 | 3 | 4 | 5 | 6 | 10 | 12 | 15 | 20 | 30 | undefined;
	onCancel?(): void;
}

export default function TimePicker(p: IProps) {
	const { onCancel, ...props } = p;
	// 标记一下，解决mode为datetime时选择完日期后无法再重新选择日期问题
	const [reset, setreset] = useState(false);
	useEffect(() => {
		if (p.mode === 'datetime') {
			setreset(false);
		}
	}, [p]);
	if (p.mode === 'datetime' && reset) {
		// 这里作用是当选择完之后重新构建控件，这样如果mode为datetime时，将重新回到选择日期界面
		return <></>;
	}
	return (
		<DateTimePicker
			{...props}
			onCancel={() => {
				if (onCancel) {
					onCancel();
				}
				if (p.mode === 'datetime') {
					// 这里作用是当选择完之后重新构建控件，这样如果mode为datetime时，将重新回到选择日期界面
					setreset(true);
				}
			}}
			onConfirm={(date: Date) => {
				props.onConfirm(date);
				if (p.mode === 'datetime') {
					// 这里作用是当选择完之后重新构建控件，这样如果mode为datetime时，将重新回到选择日期界面
					setreset(true);
				}
			}}
			onDateChange={(newDate: Date) => {
				if (props.onDateChange) {
					props.onDateChange(newDate);
				}
			}}
		/>
	);
}
