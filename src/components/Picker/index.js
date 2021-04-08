import React from 'react';
import { Picker  as PickerSelect} from '@react-native-picker/picker';

import { PickerView } from './styles';

export default function Picker({ onChange, type }) {
 return (
    <PickerView>
        <PickerSelect style={{width: "100%"}}
        selectedValue={type}
        onValueChange={ (value) => onChange(value)}
        >
            <PickerSelect.Item label="Receita" value="receita"/>
            <PickerSelect.Item label="Despesa" value="despesa"/>
        </PickerSelect>
    </PickerView>
  );
}