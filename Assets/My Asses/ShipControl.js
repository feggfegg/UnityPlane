#pragma strict

var throttle = 0.0;
var engineThrust = 1;
var rudder = 0;
var yoke = new Vector2(0,0);
var sensitivity = new Vector2(0.1,0.1);
var controlSurfaceTorque = new Vector3(1,1,1);
var liftPerVelocity = 10;

function Start () {

}

function Update () {

}

function FixedUpdate() {
	var hvInput = new Vector2(Input.GetAxis("Horizontal"), Input.GetAxis("Vertical"));
	var mouseInput = new Vector2(Input.GetAxis("Mouse X"), Input.GetAxis("Mouse Y"));

	throttle = Mathf.Clamp01(throttle + hvInput.y * Time.fixedDeltaTime);
	rudder = Mathf.Clamp(rudder + hvInput.x, -1, 1);		
	yoke.x = Mathf.Clamp(yoke.x+mouseInput.x*sensitivity.x, -1, 1);
	yoke.y = Mathf.Clamp(yoke.y+mouseInput.y*sensitivity.y, -1, 1);
	
	var force = new Vector3(
		0,
		rigidbody.velocity.magnitude * liftPerVelocity,
		throttle*engineThrust);
		
	var torque = new Vector3(
		yoke.y * controlSurfaceTorque.x, 
		rudder * controlSurfaceTorque.y,
		-yoke.x * controlSurfaceTorque.z);

	rigidbody.AddRelativeForce(force);
	rigidbody.AddRelativeTorque(torque);
	
	Debug.Log("Th: " + throttle + " t " + torque);
	
	
	yoke.x = Mathf.MoveTowards(yoke.x, 0, Time.fixedDeltaTime);
	yoke.y = Mathf.MoveTowards(yoke.y, 0, Time.fixedDeltaTime);
	rudder = Mathf.MoveTowards(rudder, 0, Time.fixedDeltaTime);
	
	// rigidbody.AddForce(inputVec);
}