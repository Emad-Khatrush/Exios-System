import React, { Component } from 'react'
import { CircularProgress, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import Activity from '../../components/Activity/Activity'
import Card from '../../components/Card/Card'
import { connect } from 'react-redux'
import { getActivities } from '../../actions/activities'
import { ActivityType } from '../../models'

type Props = {
  getActivities: any
  listData: any
}

type State = {
  selectorValue: string
}

class Activities extends Component<Props, State> {
  state: State = {
    selectorValue: 'all'
  }

  componentDidMount() {
    this.props.getActivities();
  }

  filterList = (activity: ActivityType[]) => {
    const { selectorValue } = this.state;
    return activity.filter((atv: ActivityType) => selectorValue === 'all' || atv.details.type === selectorValue);
  }

  render() {
    const { listData } = this.props;

    const filteredList = this.filterList(listData.list);

    return (
      <div className="container mt-4">
        <div className="row" style={{ maxWidth: '1100px', margin: 'auto'}}>
          <div className="col-12">
            <Card>
              <div className='d-flex justify-content-between'>
                <h3> Activities </h3>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small">Filter</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    label="ALL"
                    defaultValue={this.state.selectorValue}
                    onChange={(event) => this.setState({ selectorValue: event.target.value })}
                  >
                    <MenuItem value="all">
                      <em>ALL</em>
                    </MenuItem>
                    <MenuItem value="order">
                      <em>Only Orders</em>
                    </MenuItem>
                    <MenuItem value="expense">Only Expenses</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <hr style={{ color: '#b7b7b7' }} />
              {filteredList && filteredList.slice().reverse().map((activity: ActivityType, index: number) => (
                <Activity 
                  key={activity._id} 
                  activity={activity} 
                  index={index}
                  totalList={listData?.list.length}
                />
              ))}
              {filteredList.length === 0 &&
                <>
                  {listData.listStatus.isLoading ? 
                  <CircularProgress className='text-center' />
                  :
                  <p className='text-center'> No activities found </p>
                  }
                </>
              }
            </Card>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => {
	return {
		listData: state.activity,
	};
}

const mapDispatchToProps = {
  getActivities,
};

export default connect(mapStateToProps, mapDispatchToProps)(Activities)
