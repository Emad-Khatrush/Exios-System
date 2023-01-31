import { connect } from 'react-redux'
import React, { Component } from 'react'
import Card from '../../components/Card/Card'
import Badge from '../../components/Badge/Badge'
import { ImAttachment } from "react-icons/im";
import Task from '../../components/Task/Task'
import { FaRegComment } from 'react-icons/fa';
import { Avatar, AvatarGroup, Box, CircularProgress, Dialog } from '@mui/material';
import CustomButton from '../../components/CustomButton/CustomButton';
import { AiOutlineEdit, AiOutlinePlus } from 'react-icons/ai';
import api from '../../api';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import moment from 'moment';
import FilesPreviewers from '../../components/FilesPreviewers/FilesPreviewers';
import { Link } from 'react-router-dom';

type MyProps = {}

const labels: any = {
  urgent: 'عاجل',
  normal: 'عادي',
  limitedTime: 'وقت محدد'
}

const statusLabels: any = {
  processing: 'في قيد تجهيز ',
  finished: 'اكتملت',
  needsApproval: 'تحتاج للموافقة'
}

type State = {
  isDialogOpen: boolean
  tasks: any[]
  searchValue: string
  countList: {
    newCount: number
    myTasksCount: number
    urgentCount: number
    finishedCount: number
  }
  clickedTask: any
  isLoading: boolean
}

export class MyTasks extends Component<MyProps, State> {
  state = {
    isDialogOpen: false,
    tasks: [{
      title: '',
      description: ''
    }],
    searchValue: 'new',
    countList: {
      newCount: 0,
      myTasksCount: 0,
      urgentCount: 0,
      finishedCount: 0,
      requestedTasksCount: 0,
      needsApproval: 0
    },
    clickedTask: null,
    isLoading: false
  }

  async componentDidMount() {
    this.setState({ isLoading: true })
    try {
      const res = await api.get(`mytasks?taskType=new`);
      const tasks = res.data.results;
      const countList = res.data.countList;

      this.setState({ tasks, countList });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false })
    }
  }

  onTabChange = async (value: string) => {
    this.setState({ isLoading: true })
    try {
      const res = await api.get(`mytasks?taskType=${value}`);
      const tasks = res.data.results;
      const countList = res.data.countList;

      this.setState({ tasks, countList });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false })
    }
  }

  render() {
    const { tasks, isDialogOpen, countList, isLoading, clickedTask }: any = this.state;

    const tabs = [
      {
        label: 'New',
        value: 'new',
        icon: <Badge style={{ marginLeft: '8px'}} text={String(countList.newCount)} color="warning" />
      },
      {
        label: 'My Tasks',
        value: 'myTasks',
        icon: <Badge style={{ marginLeft: '8px'}} text={String(countList.myTasksCount)} color="sky" />
      },
      {
        label: 'Urgent Tasks',
        value: 'urgent',
        icon: <Badge style={{ marginLeft: '8px'}} text={String(countList.urgentCount)} color="danger" />
      },
      {
        label: 'Requested Tasks',
        value: 'requestedTasks',
        icon: <Badge style={{ marginLeft: '8px'}} text={String(countList.requestedTasksCount)} color="primary" />
      },
      {
        label: 'Needs Approval',
        value: 'needsApproval',
        icon: <Badge style={{ marginLeft: '8px'}} text={String(countList.needsApproval)} color="primary" />
      },
      {
        label: 'Finished Tasks',
        value: 'finished',
        icon: <Badge style={{ marginLeft: '8px'}} text={String(countList.finishedCount)} color="success" />
      }
    ]

    const hasTasks = tasks.length > 0;

    return (
      <div className="container mt-4">
        <div className="row">
          <div className="col-12 mb-4 text-end">
            <CustomButton
              background='rgb(0, 171, 85)' 
              size="small" 
              icon={<AiOutlinePlus />}
              href={'/task/add'}
            >
              Add New Task
            </CustomButton>
          </div>
          <div className="col-12">
            <Card
              leand
              tabs={tabs}
              style={{
                height: '0',
              }}
              bodyStyle={{
                marginTop: '20px',
              }}
              searchInputOnChange={(event: any) => {
                this.setState({ searchValue: event.target.value });
              }}
              tabsOnChange={(value: string) => this.onTabChange(value)}
              // onScroll={this.onScroll}
            />

            {!hasTasks &&
              <p className='m-1'>Tasks Not Found</p>
            }

            {!isLoading ? hasTasks && tasks.map((task: any) => (
              <Task
                key={task._id}
                title={task.title}
                description={task.description}
                labelOfStatus={task.label}
                avatars={task.reviewers}
                actions={[
                  { icon: <ImAttachment size={18} />, count: task.files?.length },
                  { icon: <FaRegComment size={18} />, count: task.comments?.length },
                ]}
                scheduledTime={task.limitedTime}
                onTitleClick={() => {
                  this.setState({ isDialogOpen: true, clickedTask: task });
                }}
              />
             ))
             :
             <div> 
              <CircularProgress />
             </div>
            }
          </div>
        </div>
        
        {clickedTask && 
          <Dialog
            open={isDialogOpen}
            onClose={() => this.setState({ isDialogOpen: false })}
            scroll="body"
          >
            <Box
              sx={{
                maxWidth: 600,
                width: 600,
                borderRadius: 'md',
                p: 3,
                boxShadow: 'lg',
                border: '1px solid #e6e6e6',
                bgcolor: '#fff',
              }}
            >
              <ModalClose
                variant="outlined"
                sx={{
                  boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                  borderRadius: '50%',
                  bgcolor: '#fff',
                  border: '1px solid #e6e6e6',
                }}
              />
              
              <div className='d-flex justify-content-between align-items-center mb-5 mt-4'>
                <Link to={`/task/${clickedTask._id}/edit`}>
                  <AiOutlineEdit size="25" style={{ cursor: 'pointer' }} />
                </Link>

                <Typography
                  component="h2"
                  id="modal-title"
                  level="h4"
                  textColor="inherit"
                  fontWeight="lg"
                  mb={1}
                >
                  {clickedTask.title as any}
                </Typography>
              </div>
              <Typography id="modal-desc" textColor="text.tertiary">
                <div className='d-flex align-items-center'>
                  <p style={{ width: '150px', color: '#707070' }}> Status </p>
                  <p> {statusLabels[clickedTask.status]} </p>
                </div>

                <div className='d-flex align-items-center'>
                  <p style={{ width: '150px', color: '#707070' }}> Created By </p>
                  <p className='d-flex align-items-center gap-2'> <Avatar sx={{ width: '35px', height: '35px' }} src={clickedTask.createdBy.imgUrl} /> {clickedTask.createdBy.firstName} {clickedTask.createdBy.lastName} </p>
                </div>

                <div className='d-flex align-items-center'>
                  <p style={{ width: '150px', color: '#707070' }}> Reviewers </p>
                  <div className='d-flex align-items-center gap-2'>
                    <AvatarGroup max={4} className="mb-3" style={{ direction: 'ltr' }} >
                      {clickedTask.reviewers && clickedTask.reviewers.map((reviewer: any) => (
                        <Avatar sx={{ width: '35px', height: '35px' }} alt="" src={reviewer.imgUrl} />
                      ))}
                    </AvatarGroup>
                  </div>
                </div>

                <div className='d-flex'>
                  <p style={{ width: '150px', color: '#707070' }}> Problem In </p>
                  <a style={{ textDecoration: 'none' }} href={`/invoice/${clickedTask.order._id}/edit`} target="_blank" rel="noreferrer"> {clickedTask.order.orderId} طلبية </a>
                </div>

                <div className='d-flex'>
                  <p style={{ width: '150px', color: '#707070' }}> Created Date </p>
                  <p> {moment(clickedTask.createdAt).format('DD-MM-YYYY')} </p>
                </div>

                <div className='d-flex'>
                  <p style={{ width: '150px', color: '#707070' }}> Label </p>
                  <Badge text={labels[clickedTask.label]} color={clickedTask.label === 'urgent' ? 'danger' : 'primary'} />
                </div>
                {clickedTask.label === 'limitedTime' &&
                  <div className='d-flex'>
                    <p style={{ width: '150px', color: '#707070' }}> Last Date </p>
                    <p> {moment(clickedTask.limitedTime).format('DD-MM-YYYY')} </p>
                  </div>
                }
              </Typography>

              <hr style={{ color: '#a1a1a1' }} />

              <Typography id="modal-desc" textColor="text.tertiary" style={{ direction: 'rtl', textAlign: 'start' }}>
                <h6> شرح العمل </h6>
                <p style={{ color: '#686868', fontSize: '0.9rem' }}>{clickedTask.description}</p>
              </Typography>

              
              {clickedTask.files.length > 0 &&
                <Typography id="modal-desc" textColor="text.tertiary" style={{ direction: 'rtl', textAlign: 'start' }}>
                  <hr style={{ color: '#a1a1a1' }} />
                  <h6> ملفات المرفقة</h6>

                  <FilesPreviewers 
                    previewFiles={clickedTask.files}
                    files={clickedTask.files}
                  />
                </Typography>
              }
            </Box>
          </Dialog>
        }
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(MyTasks)