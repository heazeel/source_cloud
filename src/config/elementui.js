/*
 * @Description: elementui 配置
 * @Author: linjia
 * @Date: 2020-03-27 16:10:21
 * @LastEditors: hezhijie
 * @LastEditTime: 2020-11-07 10:50:20
 */
import Vue from 'vue';
import {
  Avatar,
  Pagination,
  Dialog,
  Drawer,
  Autocomplete,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  // InputNumber,
  Radio,
  RadioGroup,
  // RadioButton,
  Checkbox,
  // CheckboxButton,
  CheckboxGroup,
  Switch,
  Select,
  Option,
  // OptionGroup,
  Button,
  // ButtonGroup,
  Table,
  TableColumn,
  DatePicker,
  // TimeSelect,
  TimePicker,
  // Popover,
  Tooltip,
  // Breadcrumb,
  // BreadcrumbItem,
  Form,
  FormItem,
  // Tabs,
  // TabPane,
  // Tag,
  Tree,
  Alert,
  // Slider,
  // Icon,
  Row,
  Col,
  Upload,
  // Progress,
  // Spinner,
  // Badge,
  // Card,
  // Rate,
  Steps,
  Step,
  // Carousel,
  // CarouselItem,
  // Collapse,
  // CollapseItem,
  // Cascader,
  // ColorPicker,
  // Transfer,
  // Container,
  // Header,
  // Aside,
  // Main,
  Footer,
  // Timeline,
  // TimelineItem,
  Link,
  // Divider,
  Image,
  // Calendar,
  // Backtop,
  // PageHeader,
  // CascaderPanel,
  Loading,
  MessageBox,
  // Message,
  // Notification,
} from 'element-ui';

// fade/zoom 等
import 'element-ui/lib/theme-chalk/base.css';
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';

// 自己定义的局部message
import Message from '../components/message/index.js'; // 替换elementui带的message

Vue.use(Avatar);
Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Drawer);
Vue.use(Autocomplete);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Input);
// Vue.use(InputNumber);
Vue.use(Radio);
Vue.use(RadioGroup);
// Vue.use(RadioButton);
Vue.use(Checkbox);
// Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.use(Switch);
Vue.use(Select);
Vue.use(Option);
// Vue.use(OptionGroup);
Vue.use(Button);
// Vue.use(ButtonGroup);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(DatePicker);
// Vue.use(TimeSelect);
Vue.use(TimePicker);
// Vue.use(Popover);
Vue.use(Tooltip);
// Vue.use(Breadcrumb);
// Vue.use(BreadcrumbItem);
Vue.use(Form);
Vue.use(FormItem);
// Vue.use(Tabs);
// Vue.use(TabPane);
// Vue.use(Tag);
Vue.use(Tree);
Vue.use(Alert);
// Vue.use(Slider);
// Vue.use(Icon);
Vue.use(Row);
Vue.use(Col);
Vue.use(Upload);
// Vue.use(Progress);
// Vue.use(Spinner);
// Vue.use(Badge);
// Vue.use(Card);
// Vue.use(Rate);
Vue.use(Steps);
Vue.use(Step);
// Vue.use(Carousel);
// Vue.use(CarouselItem);
// Vue.use(Collapse);
// Vue.use(CollapseItem);
// Vue.use(Cascader);
// Vue.use(ColorPicker);
// Vue.use(Transfer);
// Vue.use(Container);
// Vue.use(Header);
// Vue.use(Aside);
// Vue.use(Main);
Vue.use(Footer);
// Vue.use(Timeline);
// Vue.use(TimelineItem);
Vue.use(Link);
// Vue.use(Divider);
Vue.use(Image);
// Vue.use(Calendar);
// Vue.use(Backtop);
// Vue.use(PageHeader);
// Vue.use(CascaderPanel);

Vue.use(Loading.directive);
Vue.prototype.$loading = Loading.service;
// 全局性js控制的小弹窗
const MESSAGE_BOX_DEFAULT_OPTION = {
  confirmButtonClass: 'button-sc el-button--small is-round',
  cancelButtonClass: 'button-sc el-button--small is-plain is-round',
};
// 因为减少一些值的设置，所以在这里进行前置封装，改变按钮class，当然如果自定义也是支持的
Vue.prototype.$msgbox = (options, callback) => {
  options = { ...MESSAGE_BOX_DEFAULT_OPTION, ...options };
  return MessageBox(options, callback);
};
Vue.prototype.$alert = (message, title, options) => {
  options = { ...MESSAGE_BOX_DEFAULT_OPTION, ...options };
  return MessageBox.alert(message, title, options);
};
Vue.prototype.$confirm = (message, title, options) => {
  options = { ...MESSAGE_BOX_DEFAULT_OPTION, ...options };
  return MessageBox.confirm(message, title, options);
};
Vue.prototype.$prompt = (message, title, options) => {
  options = { ...MESSAGE_BOX_DEFAULT_OPTION, ...options };
  return MessageBox.prompt(message, title, options);
};
// Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

Vue.component(CollapseTransition.name, CollapseTransition);

