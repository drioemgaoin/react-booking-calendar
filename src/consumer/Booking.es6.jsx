import React from 'react';
import { connect } from 'react-redux'
import { Field, change } from 'redux-form'
import { Tabs, Tab, ListGroup, ListGroupItem } from 'react-bootstrap'
import { required } from './BookingValidations'
import { getServices } from './BookingApi'
import _ from 'lodash';
import moment from 'moment';
import classnames from 'classnames';

let mapDispatchToProps = (dispatch) => {
  return {
   changeFieldValue: function(field, value) {
     dispatch(change('booking', field, value))
   }
  }
}

let mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        form: state.form.booking
    }
}

class Booking extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      services: [],
      service: -1
    };
  }

  componentDidMount() {
    const self = this;
    getServices().then(function(services) {
      self.setState({ services: services })
    });
    document.getElementsByName('firstName')[0].focus();
  }

  selectService(e, id) {
      e.preventDefault();

      this.props.changeFieldValue('service', id);

      const service = this.state.services.find(item => {
          return item.id === id;
      });

      const endDate = new moment(this.props.form.initial.startDate);
      endDate.add(moment.duration(service.maximum, 'minutes'));
      this.props.changeFieldValue('endDate', endDate);
  }

  renderTime(service) {
      if (service.minimum === service.maximum) {
          return service.minimum + ' min(s)';
      }

      return service.minimum + ' - ' + service.maximum + ' min(s)';
  }

  renderPanel(category, services) {
    return (
      <Tab key={category} title={category + ' Services'} eventKey={category}>
        <ListGroup>
        {
          services.map((service) => {
            return <ListGroupItem key={service.id} id={service.id} onClick={(e) => this.selectService(e, service.id)}>
                <div>
                    {service.name} {this.renderTime(service)} {service.price + '£'}
                </div>
            </ListGroupItem>
          })
        }
        </ListGroup>
      </Tab>
    )
  }

  renderField(fields) {
    const { input, label, type, className, meta: { touched, error, warning } } = fields;
    const style = classnames(
      'form-group',
      'row',
      {
        'has-error': touched && error,
        'has-warning': touched && warning,
        '': !error
      }
    )

    return (
      <div className={style}>
        <label className='col-sm-2 col-form-label'>{label}</label>
        <div className='col-sm-10'>
          <input {...input} placeholder={label} type={type} className={className} />
          {touched && ((error && <span className='help-block'>{error}</span>) || (warning && <span className='help-block'>{warning}</span>))}
        </div>
      </div>
    );
  }

  render() {
    let firstCategory;
    const panels = _.chain(this.state.services)
      .groupBy('category')
      .toPairs()
      .map((values, key) => {
        firstCategory = firstCategory ? firstCategory : key;
        return this.renderPanel(values[0], values[1])
      })
      .value();

    const styles = { padding: '10px 0px' }
    return (
      <div style={styles}>
        <Field name='firstName'
          className='form-control'
          component={this.renderField}
          type='text'
          label='First Name'
          validate={required} />

        <Field name='lastName'
          className='form-control'
          component={this.renderField}
          type='text'
          label='Last Name'
          validate={required} />

        <Field name='email'
          className='form-control'
          component={this.renderField}
          type='email'
          label='Email'
          validate={required} />

        <Field name='phone'
          className='form-control'
          component={this.renderField}
          type='text'
          label='Phone Number'
          validate={required} />

        <Field name='service'
          component={this.renderField}
          type='hidden' />

        <Tabs id='services' animation={false} defaultActiveKey={firstCategory}>
            {panels}
        </Tabs>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Booking)
