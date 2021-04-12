import React, { useState } from 'react';
import { View } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

import { Container } from './styles';

export default function DatePicker({ date, onChange }) {

    const [datenow, setDateNow] = useState(new Date(date));

    return(
        <Container>

            <DateTimePicker
            value={datenow}
            mode="date"
            display="default"
            onChange={ (event, dateSelect) => {
                const currentDate = dateSelect || datenow;

                setDateNow(currentDate);
                onChange(currentDate);

            }}
            
            
            />

        </Container>
    );
}