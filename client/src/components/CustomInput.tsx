import { Col, Row } from 'antd';

interface Props {
  name: string;
  errors: any;
  label: string;
  type?: string;
  register: any;
  defaultValue?: any;
}

const CustomInput = ({ name, errors, label, register, type = 'text' }: Props) => {
  return (
    <Row>
      <Col span={6}>
        <label htmlFor={name} className='label'>
          {label}
        </label>
      </Col>
      <Col span={18}>
        <input
          id={name}
          type={type}
          placeholder={label}
          {...register(name, { required: true })}
          className={`input-field ${errors[name] ? 'input-field-error' : ''}`}
        />
      </Col>
    </Row>
  );
};

export default CustomInput;
