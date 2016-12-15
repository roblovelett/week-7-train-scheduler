
<!DOCTYPE html>
<html lang="en">

<head>
	<title>Train Scheduler</title>
	<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <style>
		.jumbotron {
			background: #000;
			color: #fff;
		}
	</style>
</head>

<body>
	<div class="container">
        <header>
		<div class="jumbotron text-center" id="header">
            <!-- <h1>Current Train Schedule</h1> -->
            <!-- <p>Choo Choo Chee Chee</p> -->
        </div>
        </header>
        <main>
		<div class="panel panel-primary">
			<div class="panel-heading" id="output_header">
				<!-- <h4>Current Train Schedule</h4> -->
			</div>
			<div class="panel-body">
				<table class="table">
					<thead>
						<tr id="output_titles">
                            <!--
							<th>Train Name</th>
							<th>Destination</th>
							<th>Frequency (min)</th>
							<th>Next Arrival</th>
							<th>Minutes Away</th>
                            -->
						</tr>
					</thead>
					<tbody id="output">
                        <tr>
                            <!--
                            <th>Train Name</th>
                            <th>Destination</th>
                            <th>Frequency</th>
                            <th>Next Arrival</th>
                            <th>Minutes Away</th>
                            -->
                        </tr>
					</tbody>
				</table>
			</div>
		</div>
		<div class="panel panel-primary">
			<div class="panel-heading" id="input_header">
				<!-- <h4>Add Train</h4> -->
			</div>
			<div class="panel-body" id="input"></div>
		</div>
        </main>
	</div>
	<script src="https://code.jquery.com/jquery-3.1.1.js" integrity="sha256-16cdPddA6VdVInumRGo6IbivbERE8p7CQR3HzTBuELA=" crossorigin="anonymous"></script>
    <script src="https://www.gstatic.com/firebasejs/live/3.0/firebase.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.17.1/moment.min.js"></script>
	<script src="assets/js/train.js"></script>
</body>
</html>