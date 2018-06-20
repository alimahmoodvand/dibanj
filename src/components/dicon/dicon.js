import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import fontelloConfig from './selection.json';
const DIcon = createIconSetFromIcoMoon(fontelloConfig);


export default () =>  <DIcon name="absentia" size={80} color="#bf1313" />;