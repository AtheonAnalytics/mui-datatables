import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const defaultExpandCellStyles = theme => ({
  root: {
    width: 140,
  },
  fixedHeader: {
    position: 'sticky',
    top: '0px',
    left: '0px',
    zIndex: 100,
  },
  icon: {
    cursor: 'pointer',
    transition: 'transform 0.25s',
    fontSize: 18,
    marginLeft: 2,
  },
  expanded: {
    transform: 'rotate(90deg)',
  },
  hide: {
    visibility: 'hidden',
  },
  headerCell: {
    zIndex: 110,
    backgroundColor: theme.palette.background.paper,
  },
  checkboxRoot: {},
  disabled: {},
  expandContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: 5,
  },
  expandButton: {
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  expandText: {
    fontSize: 13,
    textTransform: 'none',
  },
});

class TableExpandCell extends React.Component {
  static propTypes = {
    /** Select cell part of fixed header */
    fixedHeader: PropTypes.bool.isRequired,
    /** Extend the style applied to components */
    classes: PropTypes.object,
    /** Is expandable option enabled */
    expandableOn: PropTypes.bool,
  };

  static defaultProps = {
    isHeaderCell: false,
    isRowExpanded: false,
    expandableOn: false,
    expandText: 'Expand',
  };

  render() {
    const {
      classes,
      fixedHeader,
      isHeaderCell,
      expandableOn,
      isRowExpanded,
      isRowExpandable,
      onExpand,
      expandText,
    } = this.props;

    if (!expandableOn) return false;

    const cellClass = classNames({
      [classes.root]: true,
      [classes.fixedHeader]: fixedHeader,
      [classes.headerCell]: isHeaderCell,
    });

    const iconClass = classNames({
      [classes.icon]: true,
      [classes.hide]: isHeaderCell,
      [classes.expanded]: isRowExpanded,
    });

    return (
      <TableCell className={cellClass} padding="checkbox">
        <div className={classes.expandContainer}>
          {expandableOn && !isHeaderCell && isRowExpandable && (
            <Button className={classes.expandButton} disableRipple onClick={onExpand} disabled={isHeaderCell}>
              <Typography component="span" className={classes.expandText}>
                {expandText}
              </Typography>
              <KeyboardArrowRight id="expandable-button" size="small" className={iconClass} />
            </Button>
          )}
        </div>
      </TableCell>
    );
  }
}

export default withStyles(defaultExpandCellStyles, { name: 'MUIDataTableExpandCell' })(TableExpandCell);
