import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../state/action-creators';

export function useActions() {
  const dispatch = useDispatch();

  return useMemo(() => bindActionCreators(actionCreators, dispatch), [
    dispatch,
  ]);
}
