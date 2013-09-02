<?php

//Generate json content here...
header('Content-type: application\json');

echo json_encode(array(
	'success' => true,
	'message' => 'Retrieved results...',
	'result' => array(
		0 => array(
			'id' => '1',
			'title' => 'result 1'
		),
		1 => array(
			'id' => '2',
			'title' => 'result 2'
		),
		2 => array(
			'id' => '3',
			'title' => 'result 3'
		)
	)
));