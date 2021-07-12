import * as tf from '@tensorflow/tfjs';

const model = await tf.loadLayersModel('https://foo.bar/tfjs_artifacts/model.json');
//现在，该模型已准备好进行推理(inference)，评估(evaluation)或重新训练(re-training)。例如，模型完成加载后可以立即进行预测(predict)：


// JavaScript

const example = tf.fromPixels(webcamElement);  // for example
const prediction = model.predict(example);