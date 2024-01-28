import { Col, Row } from 'antd';

interface Props {
  name: string;
  label: string;
  type?: string;
  handleChange: any;
  defaultValue?: any;
}

const ModalInput = ({ name, label, handleChange, defaultValue = '', type = 'text' }: Props) => {
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
          name={name}
          value={defaultValue}
          placeholder={label}
          onChange={handleChange}
          className={`input-field`}
        />
      </Col>
    </Row>
  );
};

export default ModalInput;
