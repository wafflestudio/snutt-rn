import { ReactNode } from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';

import { Paper } from './Paper';

type Props = { title: string; left?: ReactNode; right?: ReactNode };

export const AppBar = ({ title, left, right }: Props) => {
  return (
    <Paper style={styles.container}>
      <View style={styles.left}>{left}</View>
      <View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.right}>{right}</View>
    </Paper>
  );
};

const sideStyle: ViewStyle = { width: 60, display: 'flex', alignItems: 'center', flexDirection: 'row' };
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 45,
    alignItems: 'center',
    borderBottomColor: '#b3b3b3',
    borderBottomWidth: 1,
  },
  left: { ...sideStyle, justifyContent: 'flex-start', paddingLeft: 13 },
  right: { ...sideStyle, justifyContent: 'flex-end', paddingRight: 17 },

  title: { fontSize: 17 },
});
