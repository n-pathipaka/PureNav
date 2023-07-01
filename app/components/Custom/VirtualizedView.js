import React from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';

const VirtualizedView = ({children}) => {
  return (
    <FlatList
      data={[]}
      ListEmptyComponent={null}
      keyExtractor={() => "dummy"}
      renderItem={null}
      ListHeaderComponent={() => (
        <React.Fragment>{children}</React.Fragment>
      )}
    />
  );
}

export default VirtualizedView;