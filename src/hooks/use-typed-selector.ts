import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { StoreState } from '../state/reducers';

export const useTypedSelector: TypedUseSelectorHook<StoreState> = useSelector;
